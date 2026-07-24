'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher'
import { getSession, logout } from '@/lib/auth'

const sections = ['menu', 'about', 'reservations', 'faq', 'events', 'contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const session = await getSession()
    setLoggedIn(!!session)
  }

  const handleLogout = async () => {
    await logout()
    setLoggedIn(false)
    router.push('/')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const linkClass = (id) => `hover:text-amber-400 transition whitespace-nowrap ${activeSection === id ? 'text-amber-400 font-semibold' : ''}`

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 lg:px-6 py-4 bg-black/30 backdrop-blur-md text-white">
      <a href="/#top" className="text-xl lg:text-2xl font-serif-display font-bold whitespace-nowrap" onClick={closeMenu}>
        Northstar<span className="text-amber-500">Café</span>
      </a>

      <ul className="hidden md:flex gap-4 lg:gap-6 text-xs lg:text-sm font-medium items-center">
        <li><a href="/#menu" className={linkClass('menu')}>Menu</a></li>
        <li><a href="/#about" className={linkClass('about')}>Our Story</a></li>
        <li><a href="/#reservations" className={linkClass('reservations')}>Reservations</a></li>
        <li><a href="/#faq" className={linkClass('faq')}>FAQ</a></li>
        <li><a href="/#events" className={linkClass('events')}>Events</a></li>
        <li><a href="/#contact" className={linkClass('contact')}>Contact</a></li>
        <li><ThemeSwitcher /></li>
        {loggedIn ? (
          <>
            <li><Link href="/admin" className="hover:text-amber-400 transition text-xs opacity-70 whitespace-nowrap">Dashboard</Link></li>
            <li><button onClick={handleLogout} className="text-red-400 font-semibold hover:underline text-xs whitespace-nowrap">Logout</button></li>
          </>
        ) : (
          <li><Link href="/admin/login" className="hover:text-amber-400 transition text-xs opacity-70 whitespace-nowrap">Login</Link></li>
        )}
      </ul>

      <a href="/#reservations" className="hidden lg:inline-block bg-amber-600 hover:bg-amber-700 transition px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
        Book a Table
      </a>

      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
        <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {menuOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-stone-900 flex flex-col gap-4 p-6">
          <li><a href="/#menu" onClick={closeMenu} className={linkClass('menu')}>Menu</a></li>
          <li><a href="/#about" onClick={closeMenu} className={linkClass('about')}>Our Story</a></li>
          <li><a href="/#reservations" onClick={closeMenu} className={linkClass('reservations')}>Reservations</a></li>
          <li><a href="/#faq" onClick={closeMenu} className={linkClass('faq')}>FAQ</a></li>
          <li><a href="/#events" onClick={closeMenu} className={linkClass('events')}>Events</a></li>
          <li><a href="/#contact" onClick={closeMenu} className={linkClass('contact')}>Contact</a></li>
          <li><ThemeSwitcher /></li>
          {loggedIn ? (
            <>
              <li><Link href="/admin" onClick={closeMenu} className="text-xs opacity-70">Dashboard</Link></li>
              <li><button onClick={() => { handleLogout(); closeMenu() }} className="text-red-400 text-xs font-semibold text-left">Logout</button></li>
            </>
          ) : (
            <li><Link href="/admin/login" onClick={closeMenu} className="text-xs opacity-70">Login</Link></li>
          )}
          <li>
            <a href="/#reservations" onClick={closeMenu} className="inline-block bg-amber-600 hover:bg-amber-700 transition px-5 py-2 rounded-full text-sm font-semibold">
              Book a Table
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}
