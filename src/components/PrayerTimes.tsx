import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  fetchPrayerTimes,
  getCurrentPrayer,
  getNextPrayer,
  getTimeUntilPrayer,
} from '../utils/prayerTimesApi'
import { useLanguageStore } from '../store/languageStore'

const PrayerTimes = () => {
  const { t } = useLanguageStore()
  const [timeUntilNext, setTimeUntilNext] = useState('')

  const { data: prayerTimes, isLoading } = useQuery({
    queryKey: ['prayerTimes'],
    queryFn: () => fetchPrayerTimes(),
    refetchInterval: 60000, // Refetch every minute
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (prayerTimes) {
        const nextPrayer = getNextPrayer(prayerTimes)
        setTimeUntilNext(getTimeUntilPrayer(nextPrayer.time))
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
    { name: t('prayer.fajr'), nameAr: 'الفجر', time: prayerTimes.fajr, iqamah: '05:45' },
    { name: t('prayer.sunrise'), nameAr: 'الشروق', time: prayerTimes.sunrise, iqamah: '-' },
    { name: t('prayer.dhuhr'), nameAr: 'الظهر', time: prayerTimes.dhuhr, iqamah: '13:00' },
    { name: t('prayer.asr'), nameAr: 'العصر', time: prayerTimes.asr, iqamah: '16:30' },
    { name: t('prayer.maghrib'), nameAr: 'المغرب', time: prayerTimes.maghrib, iqamah: '18:40' },
    { name: t('prayer.isha'), nameAr: 'العشاء', time: prayerTimes.isha, iqamah: '20:30' },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-islamic-dark flex items-center gap-2">
            <Clock className="w-7 h-7 text-islamic-green" />
            {t('prayer.times')}
          </h2>
          <p className="text-gray-600 mt-1">{prayerTimes.date}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">{t('prayer.nextPrayer')}</div>
          <div className="text-lg font-bold text-islamic-green">{nextPrayer.name}</div>
          <div className="text-xl font-bold text-islamic-dark">{timeUntilNext}</div>
        </div>
      </div>

      {/* Jumu'ah Notice */}
      {new Date().getDay() === 5 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-islamic-green to-teal-600 text-white p-4 rounded-lg mb-6"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <div>
              <div className="font-bold text-lg">Jumu'ah Khutbah Today</div>
              <div className="text-sm opacity-90">
                First Khutbah: 12:30 PM • Second Khutbah: 1:30 PM
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prayers.map((prayer, index) => {
          const isCurrentPrayer = prayer.name === currentPrayer
          const isNextPrayer = prayer.name === nextPrayer.name

          return (
            <motion.div
              key={prayer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative p-5 rounded-xl border-2 transition-all duration-300
                ${
                  isCurrentPrayer
                    ? 'border-islamic-green bg-gradient-to-br from-islamic-green/10 to-teal-50 prayer-active'
                    : isNextPrayer
                    ? 'border-islamic-gold bg-gradient-to-br from-yellow-50 to-amber-50'
                    : 'border-gray-200 bg-white hover:border-islamic-green/50'
                }
              `}
            >
              {isCurrentPrayer && (
                <div className="absolute top-2 right-2 bg-islamic-green text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Now
                </div>
              )}
              {isNextPrayer && !isCurrentPrayer && (
                <div className="absolute top-2 right-2 bg-islamic-gold text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Next
                </div>
              )}

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-islamic-dark">{prayer.name}</h3>
                  <p className="text-sm text-gray-600 font-arabic">{prayer.nameAr}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-islamic-dark">{prayer.time}</div>
                </div>
              </div>

              {prayer.iqamah !== '-' && (
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('prayer.iqamah')}</span>
                  <span className="text-sm font-semibold text-islamic-dark">{prayer.iqamah}</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <Clock className="w-4 h-4 inline mr-1" />
        Updates automatically every minute
      </div>
    </div>
  )
}

export default PrayerTimes
