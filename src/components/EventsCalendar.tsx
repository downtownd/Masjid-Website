import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { Event } from '../types'
import { useLanguageStore } from '../store/languageStore'

const EventsCalendar = ({ limit }: { limit?: number }) => {
  const { t } = useLanguageStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Mock events data - would come from API in production
  const events: Event[] = [
    {
      id: '1',
      title: 'Youth Night - Islamic Quiz Competition',
      description: 'Join us for a fun evening of Islamic knowledge and prizes!',
      date: '2024-03-15',
      time: '7:00 PM',
      category: 'youth',
      location: 'Community Hall',
      maxAttendees: 50,
      currentAttendees: 32,
      registrationRequired: true,
      imageUrl: '/masjid-3.png',
    },
    {
      id: '2',
      title: "Sisters' Halaqa - Tafseer Study Circle",
      description: 'Weekly Quran study circle for sisters',
      date: '2024-03-12',
      time: '6:00 PM',
      category: 'sisters',
      location: 'Sisters Prayer Hall',
      currentAttendees: 15,
      registrationRequired: false,
    },
    {
      id: '3',
      title: 'Ramadan Preparation Workshop',
      description: 'Learn how to make the most of the blessed month',
      date: '2024-03-18',
      time: '8:00 PM',
      category: 'ramadan',
      location: 'Main Hall',
      maxAttendees: 100,
      currentAttendees: 67,
      registrationRequired: true,
      imageUrl: '/masjid-2.png',
    },
    {
      id: '4',
      title: 'Sheikh Ahmed Khan - The Path to Jannah',
      description: 'Special lecture by renowned scholar',
      date: '2024-03-20',
      time: '7:30 PM',
      category: 'lectures',
      location: 'Main Prayer Hall',
      maxAttendees: 200,
      currentAttendees: 145,
      registrationRequired: true,
      imageUrl: '/masjid-4.png',
    },
    {
      id: '5',
      title: 'Community Iftar Preparation',
      description: 'Help prepare for our daily community iftars',
      date: '2024-03-14',
      time: '4:00 PM',
      category: 'general',
      location: 'Kitchen',
      currentAttendees: 8,
      registrationRequired: false,
    },
  ]

  const categories = [
    { id: 'all', label: t('events.categories.all'), color: 'bg-gray-600' },
    { id: 'youth', label: t('events.categories.youth'), color: 'bg-cyan-600' },
    { id: 'sisters', label: t('events.categories.sisters'), color: 'bg-pink-600' },
    { id: 'ramadan', label: t('events.categories.ramadan'), color: 'bg-purple-600' },
    { id: 'lectures', label: t('events.categories.lectures'), color: 'bg-islamic-green' },
    { id: 'general', label: t('events.categories.general'), color: 'bg-gray-500' },
  ]

  const filteredEvents = events
    .filter((event) => selectedCategory === 'all' || event.category === selectedCategory)
    .slice(0, limit)

  const getCategoryColor = (category: string) => {
    return categories.find((c) => c.id === category)?.color || 'bg-gray-500'
  }

  const getAttendancePercentage = (event: Event) => {
    if (!event.maxAttendees) return 0
    return Math.round((event.currentAttendees / event.maxAttendees) * 100)
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
              transition-all duration-200
              ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg scale-105`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card group cursor-pointer hover:scale-[1.02] transition-transform"
          >
            {event.imageUrl && (
              <div className="relative h-48 -m-6 mb-4 rounded-t-xl overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div
                  className={`absolute top-3 left-3 ${getCategoryColor(
                    event.category
                  )} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {categories.find((c) => c.id === event.category)?.label}
                </div>
              </div>
            )}

            <h3 className="text-xl font-bold text-islamic-dark mb-2 group-hover:text-islamic-green transition-colors">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar className="w-4 h-4 text-islamic-green" />
                <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-islamic-green" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-islamic-green" />
                <span>{event.location}</span>
              </div>
            </div>

            {event.maxAttendees && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.currentAttendees} / {event.maxAttendees}
                    </span>
                  </div>
                  <span className="font-semibold text-islamic-green">
                    {getAttendancePercentage(event)}% Full
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-islamic-green to-teal-500 transition-all duration-500"
                    style={{ width: `${getAttendancePercentage(event)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {event.registrationRequired && (
                <button
                  className="flex-1 btn-primary py-2 text-sm"
                  disabled={!!(event.maxAttendees && event.currentAttendees >= event.maxAttendees)}
                >
                  {event.maxAttendees && event.currentAttendees >= event.maxAttendees
                    ? 'Full'
                    : t('events.register')}
                </button>
              )}
              <button className="flex-1 btn-secondary py-2 text-sm">
                {t('events.addToCalendar')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No events found in this category</p>
        </div>
      )}
    </div>
  )
}

export default EventsCalendar
