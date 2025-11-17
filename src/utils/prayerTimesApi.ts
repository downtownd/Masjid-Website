import axios from 'axios'
import { format } from 'date-fns'

export interface PrayerTimesResponse {
  date: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

// Using Aladhan API for prayer times
const ALADHAN_API = 'https://api.aladhan.com/v1'

export const fetchPrayerTimes = async (
  latitude: number = 40.7128,
  longitude: number = -74.0060,
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

    return {
      date: response.data.data.date.readable,
      fajr: timings.Fajr,
      sunrise: timings.Sunrise,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
    }
  } catch (error) {
    console.error('Error fetching prayer times:', error)
    // Return fallback times
    return {
      date: format(new Date(), 'MMMM dd, yyyy'),
      fajr: '05:30',
      sunrise: '06:45',
      dhuhr: '12:30',
      asr: '15:45',
      maghrib: '18:30',
      isha: '20:00',
    }
  }
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
    const [hours, minutes] = prayers[i].time.split(':').map(Number)
    const prayerTime = hours * 60 + minutes

    const [nextHours, nextMinutes] = prayers[i + 1].time.split(':').map(Number)
    const nextPrayerTime = nextHours * 60 + nextMinutes

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
    const [hours, minutes] = prayer.time.split(':').map(Number)
    const prayerTime = hours * 60 + minutes

    if (currentTime < prayerTime) {
      return prayer
    }
  }

  return prayers[0] // Return Fajr if all prayers have passed
}

export const getTimeUntilPrayer = (prayerTime: string): string => {
  const now = new Date()
  const [hours, minutes] = prayerTime.split(':').map(Number)

  const prayer = new Date()
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
