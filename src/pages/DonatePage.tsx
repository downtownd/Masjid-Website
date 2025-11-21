import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import DonationSection from '../components/DonationSection'
import { useLanguageStore } from '../store/languageStore'

const DonatePage = () => {
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
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('donate.title')}
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              {t('donate.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Content */}
      <section className="container-custom py-12">
        <DonationSection />
      </section>

      {/* Tax Info */}
      <section className="container-custom pb-12">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-islamic-dark mb-4">Tax Deductible Donations</h3>
          <p className="text-gray-700 mb-4">
            Islamic Center of Modesto is a registered 501(c)(3) nonprofit organization. All donations are
            tax-deductible to the fullest extent allowed by law.
          </p>
          <p className="text-sm text-gray-600">
            Tax ID: 12-3456789 • You will receive a receipt via email for your records
          </p>
        </div>
      </section>
    </div>
  )
}

export default DonatePage
