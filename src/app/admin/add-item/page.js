'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import Link from 'next/link'

export default function AddMenuItem() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ category_id: '', name: '', description: '', price: '' })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const session = await getSession()
    if (!session) {
      router.push('/admin/login')
    } else {
      loadCategories()
      setChecking(false)
    }
  }

  const loadCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('sort_order')
    setCategories(data || [])
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = null

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        alert('Image upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('menu-images')
        .getPublicUrl(fileName)

      imageUrl = publicUrlData.publicUrl
    }

    const { error } = await supabase.from('menu_items').insert({
      ...form,
      price: Number(form.price),
      image_url: imageUrl
    })

    setLoading(false)
    if (!error) router.push('/admin')
  }

  if (checking) return <p className="p-6 dark:bg-stone-900 dark:text-white min-h-screen">Checking access...</p>

  return (
    <div className="dark:bg-stone-900 min-h-screen">
      <div className="p-6 max-w-md mx-auto pt-24">
        <Link href="/admin" className="text-sm text-amber-700 dark:text-amber-500 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
        <h1 className="font-serif-display text-2xl font-bold mb-6 dark:text-white">Add Menu Item</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select name="category_id" value={form.category_id} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
          <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border rounded-lg px-4 py-2 h-24 dark:bg-stone-800 dark:border-stone-700 dark:text-white" />
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" />
          <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 transition">
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  )
}