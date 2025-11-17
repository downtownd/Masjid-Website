import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'
import { FeedbackForm } from '../types'
import { useLanguageStore } from '../store/languageStore'

interface ContactFormsProps {
  defaultType?: 'volunteer' | 'suggestion' | 'imam' | 'facility'
}

const ContactForms = ({ defaultType = 'volunteer' }: ContactFormsProps) => {
  const { t } = useLanguageStore()
  const [formType, setFormType] = useState<FeedbackForm['type']>(defaultType)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false,
  })

  const formTypes = [
    {
      type: 'volunteer' as const,
      label: t('contact.volunteer'),
      icon: '🤝',
      description: 'Join our team of volunteers',
    },
    {
      type: 'suggestion' as const,
      label: t('contact.suggestion'),
      icon: '💡',
      description: 'Share your ideas with us',
    },
    {
      type: 'imam' as const,
      label: t('contact.askImam'),
      icon: '📖',
      description: 'Ask religious questions',
    },
    {
      type: 'facility' as const,
      label: t('contact.facility'),
      icon: '🏢',
      description: 'Request facility use',
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In production, this would send to an API
    console.log('Form submitted:', { type: formType, ...formData })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        anonymous: false,
      })
    }, 3000)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {formTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => setFormType(type.type)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${
                formType === type.type
                  ? 'border-islamic-green bg-gradient-to-br from-islamic-green/10 to-teal-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-islamic-green/50'
              }
            `}
          >
            <div className="text-3xl mb-2">{type.icon}</div>
            <h3 className="font-bold text-islamic-dark text-sm mb-1">{type.label}</h3>
            <p className="text-xs text-gray-600">{type.description}</p>
          </button>
        ))}
      </div>

      {/* Form */}
      <motion.div
        key={formType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-islamic-dark mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Your message has been received. We'll get back to you soon, insha'Allah.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-islamic-dark mb-2">
                {formTypes.find((t) => t.type === formType)?.label}
              </h2>
              <p className="text-gray-600">
                {formTypes.find((t) => t.type === formType)?.description}
              </p>
            </div>

            {formType === 'imam' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>Note:</strong> For urgent matters, please contact the masjid directly.
                  Questions will be answered within 2-3 business days, insha'Allah.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={formData.anonymous}
                  className="input-field"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  {t('contact.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={formData.anonymous}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                {t('contact.phone')} (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={formData.anonymous}
                className="input-field"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                {t('contact.message')} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="input-field resize-none"
                placeholder={
                  formType === 'volunteer'
                    ? 'Tell us about your interests and availability...'
                    : formType === 'suggestion'
                    ? 'Share your suggestion with us...'
                    : formType === 'imam'
                    ? 'Please state your question clearly...'
                    : 'Describe your facility request...'
                }
              />
            </div>

            {formType === 'suggestion' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) =>
                    setFormData({ ...formData, anonymous: e.target.checked })
                  }
                  className="w-4 h-4 text-islamic-green border-gray-300 rounded focus:ring-islamic-green"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Submit anonymously
                </label>
              </div>
            )}

            <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              {t('contact.submit')}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default ContactForms
