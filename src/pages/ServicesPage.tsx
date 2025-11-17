import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  Heart,
  GraduationCap,
  Smile,
  MessageCircle,
  Baby,
  Home,
  Award,
} from 'lucide-react'
import { useLanguageStore } from '../store/languageStore'
import { Service } from '../types'

const ServicesPage = () => {
  const { t } = useLanguageStore()

  const services: Service[] = [
    {
      id: '1',
      title: 'Daily Prayers',
      description:
        'All five daily prayers are held in congregation. Join us for spiritual connection and community.',
      icon: 'prayer',
      availability: 'Daily',
    },
    {
      id: '2',
      title: 'Islamic Education',
      description:
        'Weekend Islamic school for children and adults. Learn Quran, Arabic, and Islamic studies.',
      icon: 'education',
      contactEmail: 'education@communitymasjid.org',
      availability: 'Saturdays & Sundays',
    },
    {
      id: '3',
      title: 'Youth Programs',
      description:
        'Engaging activities for Muslim youth including sports, competitions, and mentorship.',
      icon: 'youth',
      contactEmail: 'youth@communitymasjid.org',
      availability: 'Weekly',
    },
    {
      id: '4',
      title: 'Marriage Services',
      description:
        'Nikah ceremonies, premarital counseling, and marriage support services.',
      icon: 'marriage',
      contactEmail: 'nikah@communitymasjid.org',
      contactPhone: '(123) 456-7890',
    },
    {
      id: '5',
      title: 'Counseling',
      description:
        'Confidential Islamic counseling for individuals, couples, and families.',
      icon: 'counseling',
      contactEmail: 'counseling@communitymasjid.org',
      availability: 'By Appointment',
    },
    {
      id: '6',
      title: 'Zakat Distribution',
      description:
        'Proper collection and distribution of Zakat to eligible recipients in our community.',
      icon: 'zakat',
      contactEmail: 'zakat@communitymasjid.org',
    },
    {
      id: '7',
      title: 'New Muslim Support',
      description:
        'Guidance, mentorship, and resources for those new to Islam.',
      icon: 'support',
      contactEmail: 'newmuslim@communitymasjid.org',
    },
    {
      id: '8',
      title: 'Community Outreach',
      description:
        'Interfaith dialogue, community service, and public education about Islam.',
      icon: 'outreach',
      contactEmail: 'outreach@communitymasjid.org',
    },
    {
      id: '9',
      title: 'Youth Internship Program',
      description:
        'Supervised volunteer program where high school students support masjid activities and earn officially documented service credits for their resume or school records.',
      icon: 'internship',
      contactEmail: 'internship@communitymasjid.org',
      availability: 'Year-round',
      contactPhone: '(123) 456-7890',
    },
  ]

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      prayer: BookOpen,
      education: GraduationCap,
      youth: Users,
      marriage: Heart,
      counseling: MessageCircle,
      zakat: Smile,
      support: Baby,
      outreach: Home,
      internship: Award,
    }
    return icons[iconName] || BookOpen
  }

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
            <Smile className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('services.title')}
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-islamic-green to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-islamic-dark mb-3 group-hover:text-islamic-green transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  {service.availability && (
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Availability:</span>{' '}
                      <span className="text-gray-600">{service.availability}</span>
                    </div>
                  )}
                  {service.contactEmail && (
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Contact:</span>{' '}
                      <a
                        href={`mailto:${service.contactEmail}`}
                        className="text-islamic-green hover:underline"
                      >
                        {service.contactEmail}
                      </a>
                    </div>
                  )}
                  {service.contactPhone && (
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">Phone:</span>{' '}
                      <a
                        href={`tel:${service.contactPhone}`}
                        className="text-islamic-green hover:underline"
                      >
                        {service.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Additional Info */}
      <section className="container-custom pb-12">
        <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-islamic-dark mb-4">Need Additional Support?</h2>
          <p className="text-gray-700 text-lg mb-6">
            If you don't see the service you're looking for, or if you have questions about any
            of our programs, please don't hesitate to reach out to us.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="tel:+11234567890" className="btn-primary">
              Call Us
            </a>
            <a href="/contact" className="btn-secondary">
              Contact Form
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
