const events = [
  { title: 'Live Jazz Night', date: 'Every Friday, 7PM', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop' },
  { title: 'New Seasonal Menu Launch', date: 'Starting Dec 1st', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop' },
  { title: 'Latte Art Workshop', date: 'First Saturday Monthly', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop' },
]

export default function EventsSection() {
  return (
    <section id="events" className="py-24 px-6 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif-display text-4xl font-bold mb-12 text-center dark:text-white">What's Happening</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.title} className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-md">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-bold text-lg dark:text-white">{event.title}</h3>
                <p className="text-amber-700 dark:text-amber-500 text-sm mt-1">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}