import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { useNotificationStore } from '../store/notificationStore'

const NotificationPermissionPrompt = () => {
  const { showPrompt, hidePrompt } = useNotificationStore()

  const handleAllow = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        useNotificationStore.setState({ permission: 'granted', enabled: true })
        // Send a test notification
        new Notification('Notifications Enabled!', {
          body: "You'll now receive prayer time reminders and important announcements",
          icon: '/mosque-icon.svg',
        })
      }
    }
    hidePrompt()
  }

  const handleDeny = () => {
    hidePrompt()
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleDeny}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <button
                onClick={handleDeny}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-islamic-green to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-islamic-dark mb-2">
                  Stay Connected
                </h2>
                <p className="text-gray-600">
                  Get notified about prayer times, upcoming events, and important community announcements
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-islamic-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-islamic-green rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-islamic-dark">Prayer Time Reminders</p>
                    <p className="text-gray-600">Never miss a salah with timely notifications</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-islamic-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-islamic-green rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-islamic-dark">Event Updates</p>
                    <p className="text-gray-600">Get notified about lectures and programs</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-islamic-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-islamic-green rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-islamic-dark">Important Announcements</p>
                    <p className="text-gray-600">Stay informed about community news</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDeny}
                  className="flex-1 btn-secondary py-3"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleAllow}
                  className="flex-1 btn-primary py-3"
                >
                  Allow Notifications
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                You can change this setting anytime in your browser
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NotificationPermissionPrompt
