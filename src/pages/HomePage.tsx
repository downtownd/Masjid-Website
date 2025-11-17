import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Users, BookOpen, Heart, Award, CheckCircle, FileText, Calendar as CalendarIcon } from 'lucide-react'
import PrayerTimes from '../components/PrayerTimes'
import EventsCalendar from '../components/EventsCalendar'
import LiveStream from '../components/LiveStream'
import { useLanguageStore } from '../store/languageStore'

const HomePage = () => {
  const { t } = useLanguageStore()

  const stats = [
    { icon: Users, value: '500+', label: 'Active Members' },
    { icon: BookOpen, value: '15+', label: 'Weekly Programs' },
    { icon: Heart, value: '$250K+', label: 'Community Support' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-islamic-green via-teal-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/masjid-1.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative container-custom py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.welcome')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-50">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="btn-primary bg-white text-islamic-green hover:bg-gray-100">
                {t('nav.donate')}
              </Link>
              <Link
                to="/events"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
              >
                {t('nav.events')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-2 text-teal-100">
              <MapPin className="w-5 h-5" />
              <span>1445 N Carpenter Rd, Modesto, CA 95358</span>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-custom -mt-16 relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white rounded-xl shadow-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-islamic-green" />
              </div>
              <div className="text-3xl font-bold text-islamic-dark mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="container-custom mb-20">
        <PrayerTimes />
      </section>

      {/* Live Stream Section */}
      <section className="container-custom mb-20">
        <LiveStream />
      </section>

      {/* Upcoming Events Section */}
      <section className="container-custom mb-20">
        <div className="text-center mb-10">
          <h2 className="section-title">{t('events.title')}</h2>
          <p className="section-subtitle">Join us for upcoming programs and activities</p>
        </div>
        <EventsCalendar limit={3} />
        <div className="text-center mt-8">
          <Link to="/events" className="btn-secondary inline-flex items-center gap-2">
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-br from-teal-50 to-green-50 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">About Our Masjid</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Established in 1995, Islamic Center of Modesto has been a cornerstone of Islamic faith
                and practice in our community. We are dedicated to fostering spiritual growth,
                education, and social welfare for all.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Our doors are open to everyone seeking knowledge, peace, and community. We
                offer daily prayers, Islamic education, youth programs, and various community
                services.
              </p>
              <Link to="/services" className="btn-primary inline-flex items-center gap-2">
                Our Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/masjid-2.png"
                alt="Islamic Center of Modesto - Prayer Hall"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
              <img
                src="/masjid-3.png"
                alt="Islamic Center of Modesto - Community"
                className="rounded-xl shadow-lg w-full h-48 object-cover mt-8"
              />
              <img
                src="/masjid-4.png"
                alt="Islamic Center of Modesto - Facilities"
                className="rounded-xl shadow-lg w-full h-48 object-cover -mt-8"
              />
              <img
                src="/masjid-5.png"
                alt="Islamic Center of Modesto - Interior"
                className="rounded-xl shadow-lg w-full h-48 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Youth Internship Section */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Content */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-islamic-green to-teal-700 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Youth Internship Program</h2>
              </div>

              <p className="text-xl text-teal-50 mb-8 leading-relaxed">
                A supervised volunteer program where high school students support masjid activities
                and earn officially documented service credits for their resume or school records.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Official Documentation</h3>
                    <p className="text-teal-100">
                      Receive verified service hour certificates for college applications
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-teal-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Resume Building</h3>
                    <p className="text-teal-100">
                      Gain valuable experience in event planning, administration, and community service
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-6 h-6 text-teal-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Flexible Schedule</h3>
                    <p className="text-teal-100">
                      Work around your school schedule with year-round opportunities
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="mailto:internship@icomodesto.org"
                className="btn-primary bg-white text-islamic-green hover:bg-gray-100 inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Right side - Info */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-teal-50 to-green-50">
              <h3 className="text-2xl font-bold text-islamic-dark mb-6">What You'll Do</h3>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-islamic-green">
                  <h4 className="font-bold text-islamic-dark mb-1">Event Support</h4>
                  <p className="text-gray-600 text-sm">
                    Help organize community events, youth programs, and educational workshops
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-islamic-green">
                  <h4 className="font-bold text-islamic-dark mb-1">Administrative Tasks</h4>
                  <p className="text-gray-600 text-sm">
                    Assist with registration, communication, and facility management
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-islamic-green">
                  <h4 className="font-bold text-islamic-dark mb-1">Educational Support</h4>
                  <p className="text-gray-600 text-sm">
                    Help with weekend Islamic school and youth education programs
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-islamic-green">
                  <h4 className="font-bold text-islamic-dark mb-1">Community Outreach</h4>
                  <p className="text-gray-600 text-sm">
                    Participate in food drives, charity events, and interfaith initiatives
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white rounded-lg border-2 border-islamic-green">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Requirements:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Current high school student (grades 9-12)</li>
                  <li>Minimum 3-month commitment</li>
                  <li>Parental consent required</li>
                  <li>4-10 hours per week</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-islamic-green to-teal-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Support Your Community
          </h2>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
            Your donations help us maintain the masjid, support community programs, and serve
            those in need. Every contribution makes a difference.
          </p>
          <Link
            to="/donate"
            className="btn-primary bg-white text-islamic-green hover:bg-gray-100 inline-flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
