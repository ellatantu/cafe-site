import MenuSection from './components/MenuSection'
import FeaturesSection from './components/FeaturesSection'
import ReservationForm from './components/ReservationForm'
import FAQSection from './components/FAQSection'
import EventsSection from './components/EventsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import { supabase } from '@/lib/supabase'

async function getSiteContent() {
  const { data } = await supabase.from('site_content').select('*')
  const content = {}
  data?.forEach((row) => { content[row.key] = row.value })
  return content
}

export default async function Home() {
  const content = await getSiteContent()

  return (
    <div>
      <section id="top" className="relative text-white py-32 px-6 text-center overflow-hidden min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&h=900&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="relative z-10">
          <h1 className="font-serif-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {content.hero_title || 'Coffee, Made With Care'}
          </h1>
          <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto">
            {content.hero_subtitle || ''}
          </p>
          <a href="#menu" className="inline-block bg-amber-600 hover:bg-amber-700 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg">
            View Menu
          </a>
        </div>
      </section>

      <section className="bg-stone-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-serif-display text-4xl font-bold text-amber-500">{content.stat_year}</p>
            <p className="text-gray-400 text-sm mt-2">Est.</p>
          </div>
          <div>
            <p className="font-serif-display text-4xl font-bold text-amber-500">{content.stat_cups}</p>
            <p className="text-gray-400 text-sm mt-2">Cups Served Monthly</p>
          </div>
          <div>
            <p className="font-serif-display text-4xl font-bold text-amber-500">{content.stat_rating}</p>
            <p className="text-gray-400 text-sm mt-2">Average Rating</p>
          </div>
          <div>
            <p className="font-serif-display text-4xl font-bold text-amber-500">{content.stat_categories}</p>
            <p className="text-gray-400 text-sm mt-2">Menu Categories</p>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <MenuSection />
      </ScrollReveal>

      <ScrollReveal>
        <section id="about" className="relative py-32 px-6 text-white text-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-fixed bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=900&fit=crop')" }}
          ></div>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif-display text-4xl font-bold mb-6">{content.about_title || 'Our Story'}</h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              {content.about_text || ''}
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>

      <ScrollReveal>
        <ReservationForm />
      </ScrollReveal>

      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>

      <ScrollReveal>
        <EventsSection />
      </ScrollReveal>

      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      <Footer />
    </div>
  )
}