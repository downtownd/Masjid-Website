import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    {
      id: 'udhiyah',
      title: 'Udhiyah (Qurban)',
      description: 'Sacrifice during Eid al-Adha to help those in need',
      goalAmount: 25000,
      currentAmount: 12300,
      category: 'sadaqah',
      icon: 'hand-heart',
      paypalLink: 'https://www.paypal.com/donate/?hosted_button_id=YTHUBQRXD6RFS',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {causes.map((cause, index) => {
          const progress = getProgress(cause)
          const isSelected = selectedCause === cause.id

          return (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedCause(cause.id)}
              className={`
                cursor-pointer rounded-2xl p-6 transition-all duration-300
                ${
                  isSelected
                    ? 'glass-strong border-2 border-islamic-gold shadow-2xl'
                    : 'glass border border-islamic-green/20 hover:border-islamic-green/50'
                }
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  className={`
                    p-3 rounded-xl transition-all duration-300
                    ${
                      isSelected
                        ? 'bg-gradient-to-br from-islamic-gold to-yellow-500 text-islamic-dark'
                        : 'bg-gradient-to-br from-islamic-green to-islamic-green-light text-white'
                    }
                  `}
                  animate={{ rotate: isSelected ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {getIcon(cause.icon)}
                </motion.div>
                {progress >= 100 && (
                  <span className="bg-gradient-to-r from-islamic-green to-islamic-green-light text-white text-xs px-3 py-1.5 rounded-full font-bold">
                    Funded!
                  </span>
                )}
              </div>

              <h3 className="font-bold text-islamic-cream text-lg mb-2">{cause.title}</h3>
              <p className="text-sm text-islamic-cream/70 mb-4 line-clamp-2">{cause.description}</p>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-islamic-cream/60">{progress}%</span>
                  <span className="font-bold text-islamic-gold">
                    {formatCurrency(cause.currentAmount)}
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="h-3 bg-islamic-dark/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-islamic-gold via-islamic-green to-islamic-green-light relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer" />
                  </motion.div>
                </div>

                <div className="text-right text-xs text-islamic-cream/50 mt-1.5">
                  Goal: {formatCurrency(cause.goalAmount)}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Donation Form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCause}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-strong rounded-3xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-serif font-bold text-islamic-cream mb-3"
            >
              {selectedCauseData.title}
            </motion.h2>
            <p className="text-islamic-cream/80 text-lg">{selectedCauseData.description}</p>
          </div>

          {/* Donation Type Toggle */}
          <div className="flex gap-3 mb-8 glass p-2 rounded-xl">
            <motion.button
              onClick={() => setDonationType('one-time')}
              className={`
                flex-1 py-4 rounded-lg font-semibold transition-all duration-300
                ${
                  donationType === 'one-time'
                    ? 'bg-gradient-to-r from-islamic-green to-islamic-green-light text-white shadow-lg'
                    : 'text-islamic-cream/70 hover:text-islamic-cream'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('donate.oneTime')}
            </motion.button>
            <motion.button
              onClick={() => setDonationType('monthly')}
              className={`
                flex-1 py-4 rounded-lg font-semibold transition-all duration-300
                ${
                  donationType === 'monthly'
                    ? 'bg-gradient-to-r from-islamic-green to-islamic-green-light text-white shadow-lg'
                    : 'text-islamic-cream/70 hover:text-islamic-cream'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('donate.monthly')}
            </motion.button>
          </div>

          {/* Amount Selection with Ripple Effect */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {predefinedAmounts.map((amount, index) => {
              const isSelected = selectedAmount === amount && !customAmount

              return (
                <motion.button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount)
                    setCustomAmount('')
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative py-5 rounded-xl font-bold text-xl transition-all duration-300 ripple-effect
                    ${
                      isSelected
                        ? 'bg-gradient-to-br from-islamic-gold to-yellow-500 text-islamic-dark shadow-2xl'
                        : 'glass hover:glass-strong text-islamic-cream'
                    }
                  `}
                >
                  ${amount}
                </motion.button>
              )
            })}
          </div>

          {/* Custom Amount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <label className="block text-sm font-semibold text-islamic-cream mb-3">
              {t('donate.customAmount')}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-islamic-gold" />
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(0)
                }}
                placeholder="Enter amount"
                className="input-field pl-14 text-xl py-4"
              />
            </div>
          </motion.div>

          {/* Impact Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 mb-8 border border-islamic-green/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-islamic-gold to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-islamic-dark" />
              </div>
              <div>
                <p className="font-bold text-islamic-cream mb-2 text-lg">Your Impact</p>
                <p className="text-sm text-islamic-cream/80 leading-relaxed">
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
          </motion.div>

          {/* Donate Button */}
          <motion.a
            href={selectedCauseData.paypalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-gold py-5 text-xl flex items-center justify-center gap-3 ripple-effect block text-center"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Heart className="w-6 h-6" />
            <span>
              {t('donate.donateNow')} ${customAmount || selectedAmount}
              {donationType === 'monthly' && '/month'}
            </span>
          </motion.a>

          <p className="text-center text-sm text-islamic-cream/60 mt-5">
            All donations are tax-deductible. You'll receive a receipt via email.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default DonationSection
