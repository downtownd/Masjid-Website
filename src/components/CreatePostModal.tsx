import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Store, Newspaper, MessageCircle, AlertCircle } from 'lucide-react'
import { useForumStore } from '../store/forumStore'
import { ForumCategory } from '../types'

interface CreatePostModalProps {
  onClose: () => void
  defaultCategory?: ForumCategory
}

const CreatePostModal = ({ onClose, defaultCategory = 'general' }: CreatePostModalProps) => {
  const { createPost } = useForumStore()
  const [category, setCategory] = useState<ForumCategory>(defaultCategory)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const categories = [
    { id: 'business' as ForumCategory, name: 'Community Businesses', icon: Store },
    { id: 'news' as ForumCategory, name: 'News & Announcements', icon: Newspaper },
    { id: 'general' as ForumCategory, name: 'General Discussion', icon: MessageCircle },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const result = createPost(category, title, content)

    if (result.success) {
      setMessage({ type: 'success', text: result.message })
      setTimeout(() => {
        onClose()
      }, 1500)
    } else {
      setMessage({ type: 'error', text: result.message })
    }

    setIsSubmitting(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-islamic-dark mb-6">Create New Post</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div
                className={`
                  px-4 py-3 rounded-lg text-sm flex items-start gap-2
                  ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }
                `}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{message.text}</span>
              </div>
            )}

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category
              </label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
                        ${
                          category === cat.id
                            ? 'border-islamic-green bg-islamic-green/5'
                            : 'border-gray-200 hover:border-islamic-green/50'
                        }
                      `}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          category === cat.id ? 'text-islamic-green' : 'text-gray-400'
                        }`}
                      />
                      <span
                        className={`text-xs font-medium text-center ${
                          category === cat.id ? 'text-islamic-green' : 'text-gray-600'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear and descriptive title"
                className="input-field"
                required
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {title.length}/200 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your message with the community..."
                className="input-field min-h-[200px] resize-y"
                required
                maxLength={5000}
              />
              <p className="text-xs text-gray-500 mt-1">
                {content.length}/5000 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary py-3"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Posting...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Post
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default CreatePostModal
