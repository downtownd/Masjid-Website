import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Languages } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguageStore } from '../store/languageStore'
import { Language } from '../types'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguageStore()

  // Detect scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
  ]

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/events', label: t('nav.events') },
    { path: '/services', label: t('nav.services') },
    { path: '/forum', label: 'Forum' },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/contact', label: t('nav.contact') },
  ]

  return (
    <nav
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? 'glass-strong shadow-2xl'
            : 'bg-transparent'
        }
      `}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="/logo.png"
              alt="Islamic Center of Modesto Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
                Islamic Center of Modesto
              </h1>
              <p className="text-xs text-gray-900/70 hidden md:block">
                Serving the community since 1984
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span
                  className={`
                    font-semibold transition-all duration-300
                    ${
                      location.pathname === link.path
                        ? 'text-islamic-gold'
                        : 'text-gray-900/90 hover:text-islamic-gold'
                    }
                  `}
                >
                  {link.label}
                </span>

                {/* Animated underline */}
                {location.pathname === link.path ? (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-islamic-gold to-islamic-green-light rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                ) : (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-islamic-gold rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}

            <Link
              to="/donate"
              className="btn-primary ripple-effect"
            >
              <span className="relative z-10">{t('nav.donate')}</span>
            </Link>

            {/* Language Selector with Glassmorphism */}
            <div className="relative">
              <motion.button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:glass-strong transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Languages className="w-5 h-5 text-islamic-gold" />
                <span className="text-lg">
                  {languages.find((l) => l.code === language)?.flag}
                </span>
              </motion.button>

              <AnimatePresence>
                {showLanguages && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 glass-strong rounded-xl shadow-2xl overflow-hidden border border-islamic-green/30"
                  >
                    {languages.map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setShowLanguages(false)
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          w-full px-4 py-3 text-left transition-all duration-200
                          flex items-center gap-3 hover:bg-islamic-green/30
                          ${language === lang.code ? 'bg-islamic-green/20 border-l-4 border-islamic-gold' : ''}
                        `}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm font-medium text-gray-900">{lang.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass hover:glass-strong"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gray-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-islamic-green/30 py-4"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block px-4 py-3 rounded-lg font-semibold transition-all duration-200
                        ${
                          location.pathname === link.path
                            ? 'bg-gradient-to-r from-islamic-green to-islamic-green-light text-white'
                            : 'glass hover:glass-strong text-gray-900'
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Link
                    to="/donate"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary text-center ripple-effect block"
                  >
                    <span className="relative z-10">{t('nav.donate')}</span>
                  </Link>
                </motion.div>

                {/* Mobile Language Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                  className="grid grid-cols-2 gap-2 pt-3 border-t border-islamic-green/30"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsOpen(false)
                      }}
                      className={`
                        px-4 py-3 rounded-lg text-left transition-all duration-200
                        flex items-center gap-2
                        ${
                          language === lang.code
                            ? 'bg-gradient-to-r from-islamic-green to-islamic-green-light text-white'
                            : 'glass hover:glass-strong text-gray-900'
                        }
                      `}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
