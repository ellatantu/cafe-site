'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import Link from 'next/link'

const fields = [
  { key: 'hero_title', label: 'Hero Title' },
  { key: 'hero_subtitle', label: 'Hero Subtitle' },
  { key: 'stat_year', label: 'Stat: Established Year' },
  { key: 'stat_cups', label: 'Stat: Cups Served' },
  { key: 'stat_rating', label: 'Stat: Rating' },
  { key: 'stat_categories', label: 'Stat: Menu Categories' },
  { key: 'about_title', label: 'Our Story Title' },
  { key: 'about_text', label: 'Our Story Text' },
]

export default function AdminContent() {
  const [values, setValues] = useState({})
  const [checking, setChecking] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
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
    await loadContent()
    setChecking(false)
  }

  const loadContent = async () => {
    const { data } = await supabase.from('site_content').select('*')
    const obj = {}
    data?.forEach((row) => { obj[row.key] = row.value })
    setValues(obj)
  }

  const handleChange = (key, value) => {
    setValues({ ...values, [key]: value })
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    for (const field of fields) {
      await supabase.from('site_content').upsert({ key: field.key, value: values[field.key] || '' })
    }

    setSaving(false)
    setSaved(true)
  }

  if (checking) return <p className="p-6 pt-24 dark:bg-stone-900 dark:text-white min-h-screen">Loading...</p>

  return (
    <div className="dark:bg-stone-900 min-h-screen">
      <div className="p-6 max-w-2xl mx-auto pt-24">
        <Link href="/admin" className="text-sm text-amber-700 dark:text-amber-500 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
        <h1 className="font-serif-display text-3xl font-bold mb-8 dark:text-white">Edit Site Content</h1>
        {saved && <p className="text-green-700 dark:text-green-500 mb-4">Saved successfully.</p>}
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-semibold mb-1 dark:text-white">{field.label}</label>
              {field.key.includes('text') ? (
                <textarea
                  value={values[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full h-24 dark:bg-stone-800 dark:border-stone-700 dark:text-white"
                />
              ) : (
                <input
                  value={values[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full dark:bg-stone-800 dark:border-stone-700 dark:text-white"
                />
              )}
            </div>
          ))}
          <button type="submit" disabled={saving} className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 transition">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}