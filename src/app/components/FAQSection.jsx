'use client'

import { useState } from 'react'

const faqs = [
  { q: 'What are your opening hours?', a: 'We\'re open Monday to Friday 7am-6pm, and weekends 8am-5pm.' },
  { q: 'Do you take walk-ins?', a: 'Yes! Reservations are recommended for groups of 5+, but walk-ins are always welcome.' },
  { q: 'Do you cater for allergies?', a: 'We offer oat and almond milk alternatives, and gluten-free pastry options daily.' },
  { q: 'Can I book the space for private events?', a: 'Yes, reach out via the reservation form and mention it in your notes.' },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 px-6 bg-white dark:bg-stone-900">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif-display text-4xl font-bold mb-12 text-center dark:text-white">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((item, index) => (
            <div key={index} className="border dark:border-stone-700 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold dark:text-white"
              >
                {item.q}
                <span className="text-amber-600 dark:text-amber-500">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-gray-600 dark:text-gray-400 text-sm">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}