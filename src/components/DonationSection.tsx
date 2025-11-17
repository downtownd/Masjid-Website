import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, TrendingUp, Building, GraduationCap, DollarSign } from 'lucide-react'
import { DonationCause } from '../types'
import { useLanguageStore } from '../store/languageStore'

const DonationSection = () => {
  const { t } = useLanguageStore()
  const [selectedCause, setSelectedCause] = useState<string>('general')
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')
  const [customAmount, setCustomAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(50)

  const causes: DonationCause[] = [
    {
      id: 'general',
      title: 'General Masjid Fund',
      description: 'Support daily operations, utilities, and maintenance',
      goalAmount: 50000,
      currentAmount: 34250,
      category: 'masjid',
      icon: 'mosque',
      paypalLink: 'https://www.paypal.com/donate/?hosted_button_id=YTHUBQRXD6RFS',
    },
    {
      id: 'sadaqah',
      title: 'Sadaqah Jariyah',
      description: 'Continuous charity that benefits the community long-term',
      goalAmount: 75000,
      currentAmount: 42500,
      category: 'sadaqah',
      icon: 'hand-heart',
      paypalLink: 'https://www.paypal.com/donate/?hosted_button_id=UJNVMATPEPCTJ',
    },
    {
      id: 'education',
      title: 'Islamic School',
      description: 'Support our weekend Islamic education program',
      goalAmount: 30000,
      currentAmount: 21750,
      category: 'education',
      icon: 'graduation-cap',
      paypalLink: 'https://www.paypal.com/donate/?hosted_button_id=AV7EAJWYHW28U',
    },
    {
      id: 'zakat-fitr',
      title: 'Zakat al-Fitr',
      description: 'Obligatory charity given before Eid prayer',
      goalAmount: 15000,
      currentAmount: 8750,
      category: 'zakat',
      icon: 'hand-heart',
      paypalLink: 'https://www.paypal.com/donate/?hosted_button_id=K3U9FWQWM7VWG',
    },
    {
      id: 'zakat-mal',
      title: 'Zakat al-Mal',
      description: 'Annual obligatory charity on wealth and savings',
      goalAmount: 40000,
      currentAmount: 28500,
      category: 'zakat',
      icon: 'hand-heart',
      paypalLink: 'https://www.paypal.com/donate/?hosted_button_id=PY3EL6LJT9EE6',
    },
  ]

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000]

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      mosque: Building,
      building: Building,
      'hand-heart': Heart,
      'graduation-cap': GraduationCap,
    }
    const Icon = icons[iconName] || Heart
    return <Icon className="w-8 h-8" />
  }

  const getProgress = (cause: DonationCause) => {
    return Math.round((cause.currentAmount / cause.goalAmount) * 100)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const selectedCauseData = causes.find((c) => c.id === selectedCause) || causes[0]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Causes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {causes.map((cause, index) => {
          const progress = getProgress(cause)
          return (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCause(cause.id)}
              className={`
                cursor-pointer p-6 rounded-xl border-2 transition-all duration-200
                ${
                  selectedCause === cause.id
                    ? 'border-islamic-green bg-gradient-to-br from-islamic-green/10 to-teal-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-islamic-green/50 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`
                  p-3 rounded-lg transition-colors
                  ${selectedCause === cause.id ? 'bg-islamic-green text-white' : 'bg-gray-100 text-islamic-green'}
                `}
                >
                  {getIcon(cause.icon)}
                </div>
                {progress >= 100 && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                    Funded!
                  </span>
                )}
              </div>

              <h3 className="font-bold text-islamic-dark mb-2 text-sm">{cause.title}</h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{cause.description}</p>

              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{progress}%</span>
                  <span className="font-semibold text-islamic-green">
                    {formatCurrency(cause.currentAmount)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-islamic-green to-teal-500 transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  Goal: {formatCurrency(cause.goalAmount)}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Donation Form */}
      <motion.div
        key={selectedCause}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-islamic-dark mb-2">
            {selectedCauseData.title}
          </h2>
          <p className="text-gray-600">{selectedCauseData.description}</p>
        </div>

        {/* Donation Type Toggle */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setDonationType('one-time')}
            className={`
              flex-1 py-3 rounded-lg font-semibold transition-all duration-200
              ${
                donationType === 'one-time'
                  ? 'bg-white text-islamic-green shadow-md'
                  : 'text-gray-600 hover:text-islamic-green'
              }
            `}
          >
            {t('donate.oneTime')}
          </button>
          <button
            onClick={() => setDonationType('monthly')}
            className={`
              flex-1 py-3 rounded-lg font-semibold transition-all duration-200
              ${
                donationType === 'monthly'
                  ? 'bg-white text-islamic-green shadow-md'
                  : 'text-gray-600 hover:text-islamic-green'
              }
            `}
          >
            {t('donate.monthly')}
          </button>
        </div>

        {/* Amount Selection */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount)
                setCustomAmount('')
              }}
              className={`
                py-4 rounded-lg font-bold text-lg transition-all duration-200
                ${
                  selectedAmount === amount && !customAmount
                    ? 'bg-islamic-green text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('donate.customAmount')}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(0)
              }}
              placeholder="Enter amount"
              className="input-field pl-12 text-lg"
            />
          </div>
        </div>

        {/* Impact Message */}
        <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg mb-6 border border-islamic-green/20">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-islamic-green mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-islamic-dark mb-1">Your Impact</p>
              <p className="text-sm text-gray-700">
                {donationType === 'monthly'
                  ? `Your monthly donation of $${customAmount || selectedAmount} will contribute $${
                      (parseInt(customAmount) || selectedAmount) * 12
                    } annually to ${selectedCauseData.title.toLowerCase()}`
                  : `Your donation will help us get ${(
                      ((parseInt(customAmount) || selectedAmount) / selectedCauseData.goalAmount) *
                      100
                    ).toFixed(1)}% closer to our goal`}
              </p>
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <a
          href={selectedCauseData.paypalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          {t('donate.donateNow')} ${customAmount || selectedAmount}
          {donationType === 'monthly' && '/month'}
        </a>

        <p className="text-center text-sm text-gray-600 mt-4">
          All donations are tax-deductible. You'll receive a receipt via email.
        </p>
      </motion.div>
    </div>
  )
}

export default DonationSection
