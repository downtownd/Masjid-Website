import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Building, Languages } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguageStore } from '../store/languageStore'
import { Language } from '../types'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguageStore()

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
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/contact', label: t('nav.contact') },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-islamic-green p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Building className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-islamic-dark">
                Islamic Center of Modesto
              </h1>
              <p className="text-xs text-gray-600 hidden md:block">Serving the community since 1995</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  font-semibold transition-all duration-200 relative
                  ${
                    location.pathname === link.path
                      ? 'text-islamic-green'
                      : 'text-gray-700 hover:text-islamic-green'
                  }
                `}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-islamic-green"
                  />
                )}
              </Link>
            ))}

            <Link
              to="/donate"
              className="btn-primary py-2 px-4 text-sm"
            >
              {t('nav.donate')}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Languages className="w-5 h-5 text-islamic-green" />
                <span className="text-sm font-semibold">
                  {languages.find((l) => l.code === language)?.flag}
                </span>
              </button>

              <AnimatePresence>
                {showLanguages && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setShowLanguages(false)
                        }}
                        className={`
                          w-full px-4 py-3 text-left hover:bg-islamic-green hover:text-white
                          transition-colors flex items-center gap-3
                          ${language === lang.code ? 'bg-islamic-green/10' : ''}
                        `}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      px-4 py-3 rounded-lg font-semibold transition-colors
                      ${
                        location.pathname === link.path
                          ? 'bg-islamic-green text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-center"
                >
                  {t('nav.donate')}
                </Link>

                {/* Mobile Language Selector */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsOpen(false)
                      }}
                      className={`
                        px-4 py-3 rounded-lg text-left transition-colors flex items-center gap-2
                        ${
                          language === lang.code
                            ? 'bg-islamic-green text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }
                      `}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
