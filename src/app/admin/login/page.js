'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await login(email, password)

    if (error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 px-6">
      <div className="max-w-sm w-full">
        <h1 className="font-serif-display text-3xl font-bold mb-6 text-center dark:text-white">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-lg px-4 py-2 dark:bg-stone-800 dark:border-stone-700 dark:text-white" required />
          <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 transition">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}