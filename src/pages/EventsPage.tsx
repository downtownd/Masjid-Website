import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import EventsCalendar from '../components/EventsCalendar'
import { useLanguageStore } from '../store/languageStore'

const EventsPage = () => {
  const { t } = useLanguageStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-islamic-green to-teal-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Calendar className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('events.title')}
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              Join us for educational programs, community gatherings, and spiritual growth
              opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Content */}
      <section className="container-custom py-12">
        <EventsCalendar />
      </section>
    </div>
  )
}

export default EventsPage
