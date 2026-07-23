'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('messages').insert(form)
    setLoading(false)
    if (!error) setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-stone-900">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif-display text-4xl font-bold mb-10 text-center dark:text-white">Get In Touch</h2>

        {submitted ? (
          <p className="text-amber-700 dark:text-amber-500 font-semibold text-center">Thanks! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} className="border rounded-lg px-4 py-2 h-32 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
            <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 transition">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}