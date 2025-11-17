import axios from 'axios'
import { format } from 'date-fns'

export interface PrayerTimesResponse {
  date: string
  hijriDate: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

// Using Aladhan API for prayer times
const ALADHAN_API = 'https://api.aladhan.com/v1'

// Modesto, CA coordinates
const MODESTO_LAT = 37.6391
const MODESTO_LON = -120.9969

// Convert 24-hour time to 12-hour format
export const convertTo12Hour = (time24: string): string => {
  const [hours, minutes] = time24.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export const fetchPrayerTimes = async (
  latitude: number = MODESTO_LAT,
  longitude: number = MODESTO_LON,
  method: number = 2 // Islamic Society of North America (ISNA)
): Promise<PrayerTimesResponse> => {
  try {
    const date = format(new Date(), 'dd-MM-yyyy')
    const response = await axios.get(`${ALADHAN_API}/timings/${date}`, {
      params: {
        latitude,
        longitude,
        method,
      },
    })

    const timings = response.data.data.timings
    const hijri = response.data.data.date.hijri

    return {
      date: response.data.data.date.readable,
      hijriDate: `${hijri.day} ${hijri.month.en} ${hijri.year}`,
      fajr: convertTo12Hour(timings.Fajr),
      sunrise: convertTo12Hour(timings.Sunrise),
      dhuhr: convertTo12Hour(timings.Dhuhr),
      asr: convertTo12Hour(timings.Asr),
      maghrib: convertTo12Hour(timings.Maghrib),
      isha: convertTo12Hour(timings.Isha),
    }
  } catch (error) {
    console.error('Error fetching prayer times:', error)
    // Return fallback times for Islamic Center of Modesto
    return {
      date: format(new Date(), 'MMMM dd, yyyy'),
      hijriDate: '',
      fajr: '5:30 AM',
      sunrise: '6:46 AM',
      dhuhr: '11:49 AM',
      asr: '2:32 PM',
      maghrib: '4:52 PM',
      isha: '6:07 PM',
    }
  }
}

// Convert 12-hour time to minutes for comparison
const timeToMinutes = (time: string): number => {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return 0

  let hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const period = match[3].toUpperCase()

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  return hours * 60 + minutes
}

export const getCurrentPrayer = (prayerTimes: PrayerTimesResponse): string => {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ]

  for (let i = 0; i < prayers.length - 1; i++) {
    const prayerTime = timeToMinutes(prayers[i].time)
    const nextPrayerTime = timeToMinutes(prayers[i + 1].time)

    if (currentTime >= prayerTime && currentTime < nextPrayerTime) {
      return prayers[i].name
    }
  }

  return 'Isha'
}

export const getNextPrayer = (prayerTimes: PrayerTimesResponse): { name: string; time: string } => {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ]

  for (const prayer of prayers) {
    const prayerTime = timeToMinutes(prayer.time)

    if (currentTime < prayerTime) {
      return prayer
    }
  }

  return prayers[0] // Return Fajr if all prayers have passed
}

export const getTimeUntilPrayer = (prayerTime: string): string => {
  const now = new Date()
  const prayerMinutes = timeToMinutes(prayerTime)

  const prayer = new Date()
  const hours = Math.floor(prayerMinutes / 60)
  const minutes = prayerMinutes % 60
  prayer.setHours(hours, minutes, 0, 0)

  if (prayer < now) {
    prayer.setDate(prayer.getDate() + 1)
  }

  const diff = prayer.getTime() - now.getTime()
  const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hoursLeft > 0) {
    return `${hoursLeft}h ${minutesLeft}m`
  }
  return `${minutesLeft}m`
}
