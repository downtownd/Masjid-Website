export interface PrayerTime {
  name: string
  nameArabic: string
  time: string
  iqamah?: string
}

export interface PrayerTimes {
  date: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  fajrIqamah?: string
  dhuhrIqamah?: string
  asrIqamah?: string
  maghribIqamah?: string
  ishaIqamah?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  category: 'youth' | 'sisters' | 'ramadan' | 'lectures' | 'general'
  location: string
  maxAttendees?: number
  currentAttendees: number
  imageUrl?: string
  registrationRequired: boolean
}

export interface DonationCause {
  id: string
  title: string
  description: string
  goalAmount: number
  currentAmount: number
  category: 'masjid' | 'zakat' | 'sadaqah' | 'construction' | 'education'
  icon: string
  paypalLink?: string
}

export interface Announcement {
  id: string
  message: string
  type: 'info' | 'warning' | 'urgent'
  expiresAt?: string
  link?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  contactEmail?: string
  contactPhone?: string
  availability?: string
}

export interface FeedbackForm {
  type: 'volunteer' | 'suggestion' | 'imam' | 'facility'
  name: string
  email: string
  phone?: string
  message: string
  category?: string
  anonymous?: boolean
}

export interface GalleryImage {
  id: string
  url: string
  title: string
  category: 'prayer' | 'education' | 'events' | 'facilities'
  uploadDate: string
}

export type Language = 'en' | 'ar' | 'ur' | 'so'

export interface Translation {
  [key: string]: string | Translation
}

export type ForumCategory = 'business' | 'news' | 'general'

export interface ForumPost {
  id: string
  category: ForumCategory
  title: string
  content: string
  author: string
  authorEmail: string
  createdAt: string
  replies: ForumReply[]
  isPinned?: boolean
  isLocked?: boolean
}

export interface ForumReply {
  id: string
  postId: string
  content: string
  author: string
  authorEmail: string
  createdAt: string
}

export interface ForumUser {
  name: string
  email: string
}
