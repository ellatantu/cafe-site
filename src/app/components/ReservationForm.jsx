'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ReservationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', party_size: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('reservations').insert({
      ...form,
      party_size: Number(form.party_size)
    })

    setLoading(false)
    if (!error) setSubmitted(true)
  }

  return (
    <section id="reservations" className="py-24 px-6 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif-display text-4xl font-bold mb-10 text-center dark:text-white">Book a Table</h2>

        {submitted ? (
          <p className="text-amber-700 dark:text-amber-500 font-semibold text-center">Thanks! We'll confirm your reservation shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" />
            <div className="grid grid-cols-2 gap-4">
              <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
              <input name="time" type="time" value={form.time} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
            </div>
            <input name="party_size" type="number" min="1" placeholder="Party Size" value={form.party_size} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
            <textarea name="notes" placeholder="Special requests (optional)" value={form.notes} onChange={handleChange} className="border rounded-lg px-4 py-2 h-24 dark:bg-stone-800 dark:border-stone-700 dark:text-white" />
            <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 transition">
              {loading ? 'Booking...' : 'Request Reservation'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}