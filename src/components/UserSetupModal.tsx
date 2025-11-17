import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail } from 'lucide-react'
import { useForumStore } from '../store/forumStore'
import { validateEmail, validateUsername } from '../utils/contentModeration'

interface UserSetupModalProps {
  onClose: () => void
}

const UserSetupModal = ({ onClose }: UserSetupModalProps) => {
  const { setCurrentUser } = useForumStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateUsername(name)) {
      setError('Name must be between 2 and 50 characters')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setCurrentUser({ name: name.trim(), email: email.trim() })
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-islamic-dark mb-2">Set Up Your Profile</h2>
          <p className="text-gray-600 mb-6">
            Please provide your name and email to post in the forum
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="input-field pl-12"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your email will not be publicly displayed
              </p>
            </div>

            <button type="submit" className="w-full btn-primary py-3">
              Continue
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default UserSetupModal
