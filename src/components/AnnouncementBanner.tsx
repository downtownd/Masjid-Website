import { useState, useEffect } from 'react'
import { X, AlertCircle, Info, Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Announcement } from '../types'

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      message: 'Ramadan starts in 2 weeks! Taraweeh prayers will be held daily at 8:30 PM',
      type: 'info',
      expiresAt: '2024-03-01',
    },
    {
      id: '2',
      message: 'Special Islamic lecture this Saturday at 7:00 PM - "Living a Meaningful Life"',
      type: 'info',
    },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Filter out expired announcements
    const now = new Date()
    const activeAnnouncements = announcements.filter((announcement) => {
      if (!announcement.expiresAt) return true
      return new Date(announcement.expiresAt) > now
    })
    setAnnouncements(activeAnnouncements)

    // Rotate announcements every 5 seconds
    if (activeAnnouncements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // Auto-hide after 10 seconds of inactivity
    if (autoHideTimer) {
      clearTimeout(autoHideTimer)
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 10000)

    setAutoHideTimer(timer)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [currentIndex])

  if (announcements.length === 0 || !isVisible) return null

  const currentAnnouncement = announcements[currentIndex]

  const getIcon = () => {
    switch (currentAnnouncement.type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5" />
      case 'warning':
        return <Bell className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getBackgroundColor = () => {
    switch (currentAnnouncement.type) {
      case 'urgent':
        return 'bg-red-600'
      case 'warning':
        return 'bg-yellow-600'
      default:
        return 'bg-islamic-green'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`${getBackgroundColor()} text-white animate-slideDown`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="hidden sm:block">{getIcon()}</div>
              <p className="text-sm md:text-base font-medium">
                {currentAnnouncement.message}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {announcements.length > 1 && (
                <div className="hidden sm:flex gap-1">
                  {announcements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close announcement"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnnouncementBanner
