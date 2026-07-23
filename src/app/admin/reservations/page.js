'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import Link from 'next/link'

export default function AdminReservations() {
  const [reservations, setReservations] = useState([])
  const [messages, setMessages] = useState([])
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const session = await getSession()
    if (!session) {
      router.push('/admin/login')
      return
    }
    loadData()
    setChecking(false)
  }

  const loadData = async () => {
    const { data: res } = await supabase.from('reservations').select('*').order('created_at', { ascending: false })
    setReservations(res || [])

    const { data: msgs } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    setMessages(msgs || [])
  }

  const updateStatus = async (id, status, reservation) => {
  await supabase.from('reservations').update({ status }).eq('id', id)

  await fetch('/api/send-confirmation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: reservation.email,
      name: reservation.name,
      date: reservation.date,
      time: reservation.time,
      party_size: reservation.party_size,
      status
    })
  })

  loadData()
}
  if (checking) return <p className="p-6 pt-24 dark:bg-stone-900 dark:text-white min-h-screen">Loading...</p>

  return (
    <div className="dark:bg-stone-900 min-h-screen">
      <div className="p-6 max-w-3xl mx-auto pt-24">
        <Link href="/admin" className="text-sm text-amber-700 dark:text-amber-500 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
        <h1 className="font-serif-display text-3xl font-bold mb-8 dark:text-white">Reservations & Messages</h1>

        <h2 className="text-xl font-bold mb-4 dark:text-white">Reservation Requests</h2>
        <div className="flex flex-col gap-3 mb-12">
          {reservations.length === 0 && <p className="text-gray-500 dark:text-gray-400">No reservations yet.</p>}
          {reservations.map((r) => (
            <div key={r.id} className="border dark:border-stone-700 rounded-xl p-4 bg-white dark:bg-stone-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold dark:text-white">{r.name} — party of {r.party_size}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{r.date} at {r.time}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{r.email} {r.phone && `· ${r.phone}`}</p>
                  {r.notes && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Notes: {r.notes}</p>}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  r.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  r.status === 'declined' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {r.status}
                </span>
              </div>
              <div className="flex gap-3 mt-3">
                <button onClick={() => updateStatus(r.id, 'confirmed', r)} className="text-green-700 dark:text-green-500 text-sm font-semibold hover:underline">Confirm</button>
                <button onClick={() => updateStatus(r.id, 'declined', r)} className="text-red-600 text-sm font-semibold hover:underline">Decline</button>              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4 dark:text-white">Contact Messages</h2>
        <div className="flex flex-col gap-3">
          {messages.length === 0 && <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>}
          {messages.map((m) => (
            <div key={m.id} className="border dark:border-stone-700 rounded-xl p-4 bg-white dark:bg-stone-800">
              <p className="font-bold dark:text-white">{m.name}</p>
              <a href={`mailto:${m.email}`} className="text-sm text-amber-700 dark:text-amber-500 hover:underline">{m.email}</a>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{m.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}