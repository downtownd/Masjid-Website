import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import ContactForms from '../components/ContactForms'
import { useLanguageStore } from '../store/languageStore'

const ContactPage = () => {
  const { t } = useLanguageStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-islamic-green to-teal-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Mail className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for any questions or inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="w-14 h-14 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-islamic-green" />
            </div>
            <h3 className="font-bold text-islamic-dark mb-2">Phone</h3>
            <a href="tel:+12095768149" className="text-gray-600 hover:text-islamic-green">
              (209) 576-8149
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="w-14 h-14 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-islamic-green" />
            </div>
            <h3 className="font-bold text-islamic-dark mb-2">Email</h3>
            <a
              href="mailto:info@islamicmod.org"
              className="text-gray-600 hover:text-islamic-green"
            >
              info@islamicmod.org
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <div className="w-14 h-14 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-islamic-green" />
            </div>
            <h3 className="font-bold text-islamic-dark mb-2">Address</h3>
            <p className="text-gray-600">
              1445 N Carpenter Rd
              <br />
              Modesto, CA 95358
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card text-center"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-bold text-islamic-dark mb-2">WhatsApp</h3>
            <a
              href="https://chat.whatsapp.com/ChNRdD1d3dNKPOtVx9TBuq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              Join Community
            </a>
            <p className="text-xs text-gray-500 mt-2">
              Stay connected with the community
            </p>
          </motion.div>
        </div>

        {/* Contact Forms */}
        <ContactForms />
      </section>

      {/* Office Hours */}
      <section className="container-custom pb-12">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-islamic-green" />
            <h2 className="text-2xl font-bold text-islamic-dark">Office Hours</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Sunday - Saturday</span>
              <span className="text-gray-600">4:45 AM - 12:00 AM (Midnight)</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Office Hours</span>
              <span className="text-gray-600">Call for office availability</span>
            </div>
            <p className="text-sm text-gray-600 bg-teal-50 p-3 rounded-lg">
              The masjid is open daily from Fajr (around 4:45 AM) until midnight for prayers and community activities.
            </p>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container-custom pb-12">
        <div className="card overflow-hidden">
          <h2 className="text-2xl font-bold text-islamic-dark mb-6">Find Us</h2>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace with actual Google Maps embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.2724895562845!2d-120.99912492399654!3d37.63914092112384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809050e3edc6e587%3A0x7f8c3b3fb3c45a62!2s1445%20N%20Carpenter%20Rd%2C%20Modesto%2C%20CA%2095358!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Islamic Center of Modesto Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
