import { Link } from 'react-router-dom'
import { Building, MapPin, Phone, Mail, Facebook, Youtube, MessageCircle } from 'lucide-react'
import { useLanguageStore } from '../store/languageStore'

const Footer = () => {
  const { t } = useLanguageStore()

  return (
    <footer className="bg-islamic-dark text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-islamic-green p-2 rounded-lg">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Islamic Center of Modesto</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              A place of worship, learning, and community serving families since 1995.
              Building stronger bonds through faith and service.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/modesto.imam"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@icomodesto"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-lg hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://chat.whatsapp.com/ChNRdD1d3dNKPOtVx9TBuq"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-lg hover:bg-green-600 transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-islamic-gold">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-islamic-green transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-islamic-green transition-colors">
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-islamic-green transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-islamic-green transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-gray-300 hover:text-islamic-green transition-colors">
                  Forum
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-islamic-green transition-colors">
                  {t('nav.donate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-islamic-gold">
              {t('services.title')}
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Daily Prayers</li>
              <li>Islamic Education</li>
              <li>Youth Programs</li>
              <li>Marriage Services</li>
              <li>Counseling</li>
              <li>Zakat Distribution</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-islamic-gold">
              {t('contact.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-islamic-green mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  1445 N Carpenter Rd<br />
                  Modesto, CA 95358
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-islamic-green flex-shrink-0" />
                <a href="tel:+12095768149" className="text-gray-300 hover:text-islamic-green text-sm">
                  (209) 576-8149
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-islamic-green flex-shrink-0" />
                <a
                  href="mailto:info@icomodesto.com"
                  className="text-gray-300 hover:text-islamic-green text-sm"
                >
                  info@icomodesto.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Islamic Center of Modesto. {t('footer.rights')}.
          </p>
          <p className="mt-2">
            Built with love for the Muslim community
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
