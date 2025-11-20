import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Clock, MapPin, Moon, Sun, Sunrise } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  fetchPrayerTimes,
  getCurrentPrayer,
  getNextPrayer,
  getTimeUntilPrayer,
} from '../utils/prayerTimesApi'
import { useLanguageStore } from '../store/languageStore'

// Circular progress component
const CircularProgress = ({ progress, size = 120 }: { progress: number; size?: number }) => {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="8"
        fill="none"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#gradient)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#00A86B" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const PrayerTimes = () => {
  const { t } = useLanguageStore()
  const [timeUntilNext, setTimeUntilNext] = useState('')
  const [progress, setProgress] = useState(0)

  const { data: prayerTimes, isLoading } = useQuery({
    queryKey: ['prayerTimes'],
    queryFn: () => fetchPrayerTimes(),
    refetchInterval: 60000, // Refetch every minute
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (prayerTimes) {
        const nextPrayer = getNextPrayer(prayerTimes)
        const timeUntil = getTimeUntilPrayer(nextPrayer.time)
        setTimeUntilNext(timeUntil)

        // Calculate progress (simple approximation based on minutes)
        const parts = timeUntil.split(':')
        if (parts.length === 3) {
          const hours = parseInt(parts[0])
          const minutes = parseInt(parts[1])
          const totalMinutes = hours * 60 + minutes
          // Assuming 6 hours max between prayers
          const maxMinutes = 6 * 60
          const prog = Math.max(0, Math.min(100, ((maxMinutes - totalMinutes) / maxMinutes) * 100))
          setProgress(prog)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [prayerTimes])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!prayerTimes) return null

  const currentPrayer = getCurrentPrayer(prayerTimes)
  const nextPrayer = getNextPrayer(prayerTimes)

  const prayers = [
    {
      name: t('prayer.fajr'),
      nameAr: 'الفجر',
      time: prayerTimes.fajr,
      iqamah: '5:50 AM',
      icon: Moon,
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      name: t('prayer.sunrise'),
      nameAr: 'الشروق',
      time: prayerTimes.sunrise,
      iqamah: '-',
      icon: Sunrise,
      gradient: 'from-orange-400 to-pink-500'
    },
    {
      name: t('prayer.dhuhr'),
      nameAr: 'الظهر',
      time: prayerTimes.dhuhr,
      iqamah: '12:15 PM',
      icon: Sun,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      name: t('prayer.asr'),
      nameAr: 'العصر',
      time: prayerTimes.asr,
      iqamah: '2:35 PM',
      icon: Sun,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      name: t('prayer.maghrib'),
      nameAr: 'المغرب',
      time: prayerTimes.maghrib,
      iqamah: '4:57 PM',
      icon: Sunrise,
      gradient: 'from-rose-400 to-red-500'
    },
    {
      name: t('prayer.isha'),
      nameAr: 'العشاء',
      time: prayerTimes.isha,
      iqamah: '6:15 PM',
      icon: Moon,
      gradient: 'from-blue-600 to-indigo-700'
    },
  ]

  return (
    <div className="glass-strong rounded-3xl p-8 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-8">
        {/* Title and Date */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-islamic-cream flex items-center gap-3 mb-3">
            <Clock className="w-8 h-8 text-islamic-gold" />
            {t('prayer.times')}
          </h2>
          <p className="text-islamic-cream/80 text-lg">{prayerTimes.date}</p>
          {prayerTimes.hijriDate && (
            <p className="text-sm text-islamic-cream/60 font-arabic mt-1">
              {prayerTimes.hijriDate} AH
            </p>
          )}
        </motion.div>

        {/* Next Prayer Countdown with Circular Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center glass rounded-2xl p-6"
        >
          <div className="text-sm text-islamic-cream/70 mb-2">{t('prayer.nextPrayer')}</div>
          <div className="text-xl font-bold text-islamic-gold mb-4">{nextPrayer.name}</div>

          {/* Circular Progress */}
          <div className="relative">
            <CircularProgress progress={progress} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-islamic-cream">{timeUntilNext}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Jumu'ah Notice */}
      {new Date().getDay() === 5 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl p-6 mb-8"
          style={{
            background: 'linear-gradient(135deg, #006B3F 0%, #00A86B 100%)',
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-7 h-7 text-white" />
              <div className="font-bold text-xl text-white">Jumu'ah Prayer Today</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Jumu\'ah 1', time: '1:00 PM' },
                { label: 'Jumu\'ah 2', time: '2:00 PM' },
                { label: 'Jumu\'ah 3', time: '12:00 PM' },
              ].map((jumah, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="font-semibold text-white mb-1">{jumah.label}</div>
                  <div className="text-2xl font-bold text-islamic-gold">{jumah.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Prayer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {prayers.map((prayer, index) => {
          const isCurrentPrayer = prayer.name === currentPrayer
          const isNextPrayer = prayer.name === nextPrayer.name
          const Icon = prayer.icon

          return (
            <motion.div
              key={prayer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`
                prayer-card relative overflow-hidden
                ${isCurrentPrayer ? 'prayer-card-active' : ''}
                ${isNextPrayer ? 'border-2 border-islamic-gold' : ''}
              `}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prayer.gradient} opacity-10`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Badges */}
                {isCurrentPrayer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-gradient-to-r from-islamic-green to-islamic-green-light text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg"
                  >
                    Now
                  </motion.div>
                )}
                {isNextPrayer && !isCurrentPrayer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-gradient-to-r from-islamic-gold to-yellow-500 text-islamic-dark text-xs px-3 py-1.5 rounded-full font-bold shadow-lg"
                  >
                    Next
                  </motion.div>
                )}

                {/* Prayer Icon */}
                <div className="mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${prayer.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Prayer Name */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-islamic-cream mb-1">{prayer.name}</h3>
                  <p className="text-sm text-islamic-cream/60 font-arabic">{prayer.nameAr}</p>
                </div>

                {/* Prayer Time */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-islamic-cream">{prayer.time}</div>
                </div>

                {/* Iqamah Time */}
                {prayer.iqamah !== '-' && (
                  <div className="pt-4 border-t border-islamic-cream/20 flex justify-between items-center">
                    <span className="text-sm text-islamic-cream/70">{t('prayer.iqamah')}</span>
                    <span className="text-lg font-bold text-islamic-gold">{prayer.iqamah}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-sm text-islamic-cream/60 flex items-center justify-center gap-2"
      >
        <Clock className="w-4 h-4" />
        Updates automatically every minute
      </motion.div>
    </div>
  )
}

export default PrayerTimes
