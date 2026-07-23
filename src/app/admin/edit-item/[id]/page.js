'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import Link from 'next/link'

export default function EditMenuItem() {
  const { id } = useParams()
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const session = await getSession()
    if (!session) {
      router.push('/admin/login')
      return
    }
    await loadData()
    setChecking(false)
  }

  const loadData = async () => {
    const { data: cats } = await supabase.from('categories').select('*').order('sort_order')
    setCategories(cats || [])

    const { data: item } = await supabase.from('menu_items').select('*').eq('id', id).single()
    setForm(item)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = form.image_url

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

    const { error } = await supabase.from('menu_items').update({
      category_id: form.category_id,
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image_url: imageUrl
    }).eq('id', id)

    setLoading(false)
    if (!error) router.push('/admin')
  }

  if (checking || !form) return <p className="p-6 pt-24 dark:bg-stone-900 dark:text-white min-h-screen">Loading...</p>

  return (
    <div className="dark:bg-stone-900 min-h-screen">
      <div className="p-6 max-w-md mx-auto pt-24">
        <Link href="/admin" className="text-sm text-amber-700 dark:text-amber-500 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
        <h1 className="font-serif-display text-2xl font-bold mb-6 dark:text-white">Edit Menu Item</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select name="category_id" value={form.category_id} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
          <textarea name="description" value={form.description || ''} onChange={handleChange} className="border rounded-lg px-4 py-2 h-24 dark:bg-stone-800 dark:border-stone-700 dark:text-white" />

          {form.image_url && <img src={form.image_url} alt={form.name} className="w-full h-40 object-cover rounded-lg" />}
          <label className="text-sm text-gray-600 dark:text-gray-400">Upload a new image to replace it (optional):</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" />

          <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 transition">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}