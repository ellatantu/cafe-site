'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getSession, logout } from '@/lib/auth'
import ConfirmModal from '../components/ConfirmModal'

export default function AdminDashboard() {
  const [items, setItems] = useState([])
  const [checking, setChecking] = useState(true)
  const [pendingDelete, setPendingDelete] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const session = await getSession()
    if (!session) {
      router.push('/admin/login')
    } else {
      loadItems()
      setChecking(false)
    }
  }

  const loadItems = async () => {
    const { data } = await supabase.from('menu_items').select('*, categories(name)').order('created_at')
    setItems(data || [])
  }

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  const confirmDelete = async () => {
    await supabase.from('menu_items').delete().eq('id', pendingDelete)
    setPendingDelete(null)
    loadItems()
  }

  if (checking) return <p className="p-6 dark:bg-stone-900 dark:text-white min-h-screen">Checking access...</p>

  return (
    <div className="dark:bg-stone-900 min-h-screen">
      <div className="p-6 max-w-3xl mx-auto pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif-display text-3xl font-bold dark:text-white">Admin Dashboard</h1>
          <div className="flex gap-4 items-center">
            <Link href="/admin/add-item" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
              + Add Item
            </Link>
            <Link href="/admin/reservations" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Reservations
            </Link>
            <Link href="/admin/content" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Edit Content
            </Link>
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">Log Out</button>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 dark:text-white">Menu Items</h2>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border dark:border-stone-700 rounded-xl px-5 py-3 bg-white dark:bg-stone-800 dark:text-white">
              <div>
                <span className="font-semibold">{item.name}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({item.categories?.name})</span>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-700 dark:text-amber-500">${item.price}</span>
                <Link href={`/admin/edit-item/${item.id}`} className="text-amber-700 dark:text-amber-500 font-semibold hover:underline">Edit</Link>
                <button onClick={() => setPendingDelete(item.id)} className="text-red-600 font-semibold hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {pendingDelete && (
          <ConfirmModal
            message="Are you sure you want to delete this item? This cannot be undone."
            onConfirm={confirmDelete}
            onCancel={() => setPendingDelete(null)}
          />
        )}
      </div>
    </div>
  )
}