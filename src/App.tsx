import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLanguageStore } from './store/languageStore'
import { useNotificationStore } from './store/notificationStore'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnnouncementBanner from './components/AnnouncementBanner'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import DonatePage from './pages/DonatePage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'
import ForumPage from './pages/ForumPage'
import NotificationPermissionPrompt from './components/NotificationPermissionPrompt'

function App() {
  const { initLanguage } = useLanguageStore()
  const { requestPermission } = useNotificationStore()

  useEffect(() => {
    initLanguage()

    // Request notification permission after a short delay
    const timer = setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'default') {
        requestPermission()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [initLanguage, requestPermission])

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/forum" element={<ForumPage />} />
          </Routes>
        </main>
        <Footer />
        <NotificationPermissionPrompt />
      </div>
    </Router>
  )
}

export default App
