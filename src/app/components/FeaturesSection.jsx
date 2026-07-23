const features = [
  { icon: '📶', title: 'Free WiFi', desc: 'Stay connected while you sip' },
  { icon: '🌳', title: 'Outdoor Seating', desc: 'Enjoy the fresh air on our patio' },
  { icon: '🐾', title: 'Pet Friendly', desc: 'Bring your furry friends along' },
  { icon: '🎵', title: 'Live Music', desc: 'Local artists every Friday night' },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-white dark:bg-stone-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-serif-display text-4xl font-bold mb-16 dark:text-white">Why You'll Love It Here</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="p-6">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}