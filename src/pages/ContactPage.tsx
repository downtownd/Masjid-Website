import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
            <a href="tel:+11234567890" className="text-gray-600 hover:text-islamic-green">
              (123) 456-7890
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
              href="mailto:info@communitymasjid.org"
              className="text-gray-600 hover:text-islamic-green"
            >
              info@communitymasjid.org
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
              123 Islamic Center Drive
              <br />
              Your City, State 12345
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Monday - Friday</span>
              <span className="text-gray-600">9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Saturday</span>
              <span className="text-gray-600">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Sunday</span>
              <span className="text-gray-600">10:00 AM - 2:00 PM</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Prayer Times</span>
              <span className="text-gray-600">Always Open</span>
            </div>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919315!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Masjid Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
