import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Users, BookOpen, Heart, Award, CheckCircle, FileText, Calendar as CalendarIcon, ChevronDown } from 'lucide-react'
import PrayerTimes from '../components/PrayerTimes'
import EventsCalendar from '../components/EventsCalendar'
import LiveStream from '../components/LiveStream'
import IslamicPattern from '../components/IslamicPattern'
import { useLanguageStore } from '../store/languageStore'
import { useScrollReveal, useMouseParallax } from '../hooks/useScrollReveal'

const HomePage = () => {
  const { t } = useLanguageStore()
  const mousePos = useMouseParallax(15)

  const { elementRef: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>()
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollReveal<HTMLDivElement>()
  const { elementRef: internshipRef, isVisible: internshipVisible } = useScrollReveal<HTMLDivElement>()

  const stats = [
    { icon: Users, value: '500+', label: 'Active Members' },
    { icon: BookOpen, value: '15+', label: 'Weekly Programs' },
    { icon: Heart, value: '$250K+', label: 'Community Support' },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Patterns */}
      <IslamicPattern />

      {/* Animated Mesh Gradient Background */}
      <div className="gradient-mesh" />

      {/* Hero Section - Full Screen with Animated Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/masjid-2.png)',
            backgroundPosition: 'center',
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-islamic-cream/30 via-islamic-cream/50 to-islamic-cream/70" />

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,168,107,0.6) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Hero Content with Parallax */}
        <div className="relative container-custom py-20 md:py-32 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-4xl mx-auto text-center"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          >
            {/* Main Heading with Animated Gradient Text */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
              <span className="section-title inline-block">
                {t('home.welcome')}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-3xl mb-12 text-gray-900/90 font-light leading-relaxed"
            >
              {t('home.subtitle')}
            </motion.p>

            {/* CTA Buttons with Premium Effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-6 justify-center mb-16"
            >
              <Link to="/donate" className="btn-primary ripple-effect">
                <span className="relative z-10 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {t('nav.donate')}
                </span>
              </Link>
              <Link
                to="/events"
                className="btn-secondary ripple-effect"
              >
                <span className="flex items-center gap-2">
                  {t('nav.events')}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>

            {/* Location with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="inline-flex items-center gap-3 glass px-6 py-4 rounded-full text-gray-900/90"
            >
              <MapPin className="w-5 h-5 text-islamic-gold" />
              <span className="text-lg">1445 N Carpenter Rd, Modesto, CA 95358</span>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="w-8 h-8 text-gray-900/60" />
          </motion.div>
        </div>

        {/* Wave divider with animated gradient */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(10, 14, 39, 0.8)" />
                <stop offset="50%" stopColor="rgba(26, 31, 58, 0.9)" />
                <stop offset="100%" stopColor="rgba(10, 14, 39, 0.8)" />
              </linearGradient>
            </defs>
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section with 3D Cards */}
      <section className="relative py-20" ref={statsRef}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="card card-3d text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-islamic-green to-islamic-green-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-900/70 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <PrayerTimes />
        </motion.div>
      </section>

      {/* Live Stream Section */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <LiveStream />
        </motion.div>
      </section>

      {/* Upcoming Events Section */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{t('events.title')}</h2>
          <p className="section-subtitle">Join us for upcoming programs and activities</p>
        </motion.div>
        <EventsCalendar limit={3} />
        <div className="text-center mt-10">
          <Link to="/events" className="btn-gold ripple-effect inline-flex items-center gap-2">
            <span className="flex items-center gap-2">
              View All Events
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </section>

      {/* About Section with Glassmorphism */}
      <section className="relative py-32" ref={aboutRef}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="glass-strong rounded-3xl p-8 md:p-12"
            >
              <h2 className="section-title text-left mb-6">About Our Masjid</h2>
              <p className="text-gray-900/90 text-lg leading-relaxed mb-6">
                Established in 1984, Islamic Center of Modesto has been a cornerstone of Islamic faith
                and practice in our community. We are dedicated to fostering spiritual growth,
                education, and social welfare for all.
              </p>
              <p className="text-gray-900/80 text-lg leading-relaxed mb-8">
                Our doors are open to everyone seeking knowledge, peace, and community. We
                offer daily prayers, Islamic education, youth programs, and various community
                services.
              </p>
              <Link to="/services" className="btn-primary ripple-effect inline-flex items-center gap-2">
                <span className="relative z-10 flex items-center gap-2">
                  Our Services
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { src: '/masjid-2.png', alt: 'Prayer Hall', delay: 0.1 },
                { src: '/masjid-3.png', alt: 'Community', delay: 0.2, offset: 'mt-12' },
                { src: '/masjid-4.png', alt: 'Facilities', delay: 0.3, offset: '-mt-8' },
                { src: '/masjid-5.png', alt: 'Interior', delay: 0.4 },
              ].map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={aboutVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: img.delay, duration: 0.6 }}
                  className={`${img.offset || ''} stagger-item`}
                >
                  <img
                    src={img.src}
                    alt={`Islamic Center of Modesto - ${img.alt}`}
                    className="rounded-2xl shadow-2xl w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300 border border-islamic-green/20"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Youth Internship Section - Premium Glass Card */}
      <section className="container-custom py-20" ref={internshipRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={internshipVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Content with Gradient Overlay */}
            <div className="relative p-8 md:p-12">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/20 to-islamic-gold/10" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center animate-pulse-scale">
                    <Award className="w-9 h-9 text-islamic-gold" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                    Youth Internship Program
                  </h2>
                </div>

                <p className="text-xl text-gray-900/90 mb-8 leading-relaxed">
                  A supervised volunteer program where high school students support masjid activities
                  and earn officially documented service credits for their resume or school records.
                </p>

                <div className="space-y-6 mb-10">
                  {[
                    {
                      icon: CheckCircle,
                      title: 'Official Documentation',
                      desc: 'Receive verified service hour certificates for college applications',
                    },
                    {
                      icon: FileText,
                      title: 'Resume Building',
                      desc: 'Gain valuable experience in event planning, administration, and community service',
                    },
                    {
                      icon: CalendarIcon,
                      title: 'Flexible Schedule',
                      desc: 'Work around your school schedule with year-round opportunities',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={internshipVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-islamic-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-900/70">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <a
                  href="mailto:internship@icomodesto.org"
                  className="btn-gold ripple-effect inline-flex items-center gap-2"
                >
                  <span className="flex items-center gap-2">
                    Apply Now
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right side - What You'll Do */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-islamic-dark/40 to-islamic-green/40">
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">What You'll Do</h3>

              <div className="space-y-4 mb-8">
                {[
                  {
                    title: 'Event Support',
                    desc: 'Help organize community events, youth programs, and educational workshops',
                  },
                  {
                    title: 'Administrative Tasks',
                    desc: 'Assist with registration, communication, and facility management',
                  },
                  {
                    title: 'Educational Support',
                    desc: 'Help with weekend Islamic school and youth education programs',
                  },
                  {
                    title: 'Community Outreach',
                    desc: 'Participate in food drives, charity events, and interfaith initiatives',
                  },
                ].map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={internshipVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="glass p-5 rounded-xl border-l-4 border-islamic-gold hover:scale-105 transition-transform duration-300"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">{task.title}</h4>
                    <p className="text-gray-900/70 text-sm">{task.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="glass-strong p-6 rounded-xl border-2 border-islamic-green/30">
                <p className="text-sm text-gray-900 mb-3 font-semibold">
                  Requirements:
                </p>
                <ul className="text-sm text-gray-900/80 space-y-2">
                  {[
                    'Current high school student (grades 9-12)',
                    'Minimum 3-month commitment',
                    'Parental consent required',
                    '4-10 hours per week',
                  ].map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-islamic-gold mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section with Premium Gradient */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Animated Gradient Background */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                'linear-gradient(135deg, #006B3F 0%, #00A86B 25%, #D4AF37 50%, #00A86B 75%, #006B3F 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
            }}
          />

          {/* Glass Overlay */}
          <div className="absolute inset-0 glass-dark" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white">
              Support Your Community
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your donations help us maintain the masjid, support community programs, and serve
              those in need. Every contribution makes a difference.
            </p>
            <Link
              to="/donate"
              className="btn-gold ripple-effect inline-flex items-center gap-3 text-lg"
            >
              <Heart className="w-6 h-6" />
              <span>Donate Now</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
