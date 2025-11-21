import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  Store,
  Newspaper,
  Pin,
  Lock,
  Clock,
  User,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { ForumPost } from '../types'
import { useForumStore } from '../store/forumStore'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: ForumPost
}

const PostCard = ({ post }: PostCardProps) => {
  const { currentUser, createReply } = useForumStore()
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyMessage, setReplyMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const getCategoryIcon = () => {
    switch (post.category) {
      case 'business':
        return Store
      case 'news':
        return Newspaper
      case 'general':
        return MessageCircle
    }
  }

  const getCategoryColor = () => {
    switch (post.category) {
      case 'business':
        return 'text-teal-600 bg-teal-50'
      case 'news':
        return 'text-green-600 bg-green-50'
      case 'general':
        return 'text-purple-600 bg-purple-50'
    }
  }

  const getCategoryName = () => {
    switch (post.category) {
      case 'business':
        return 'Community Business'
      case 'news':
        return 'News & Announcements'
      case 'general':
        return 'General Discussion'
    }
  }

  const Icon = getCategoryIcon()

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser || !replyContent.trim()) return

    setIsSubmitting(true)
    setReplyMessage(null)

    const result = createReply(post.id, replyContent)

    if (result.success) {
      setReplyMessage({ type: 'success', text: result.message })
      setReplyContent('')
      setShowReplies(true)
      setTimeout(() => {
        setReplyMessage(null)
        setShowReplyForm(false)
      }, 2000)
    } else {
      setReplyMessage({ type: 'error', text: result.message })
    }

    setIsSubmitting(false)
  }

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return 'recently'
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2 rounded-lg ${getCategoryColor()}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor()}`}>
                {getCategoryName()}
              </span>
              {post.isPinned && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 flex items-center gap-1">
                  <Pin className="w-3 h-3" />
                  Pinned
                </span>
              )}
              {post.isLocked && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Locked
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <Clock className="w-4 h-4" />
              <span>{getTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <h3 className="text-xl font-bold text-islamic-dark mb-3">{post.title}</h3>
      <p className="text-gray-700 whitespace-pre-wrap mb-4">{post.content}</p>

      {/* Post Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-islamic-green transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
          {showReplies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {!post.isLocked && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-2 text-sm font-medium text-islamic-green hover:text-teal-600 transition-colors"
          >
            <Send className="w-4 h-4" />
            Reply
          </button>
        )}
      </div>

      {/* Reply Form */}
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <form onSubmit={handleReplySubmit} className="space-y-3">
              {replyMessage && (
                <div
                  className={`
                    px-3 py-2 rounded-lg text-sm
                    ${
                      replyMessage.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }
                  `}
                >
                  {replyMessage.text}
                </div>
              )}

              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="input-field min-h-[100px] resize-y text-sm"
                required
                maxLength={2000}
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{replyContent.length}/2000 characters</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReplyForm(false)
                      setReplyContent('')
                      setReplyMessage(null)
                    }}
                    className="btn-secondary text-sm py-2 px-4"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                    disabled={isSubmitting || !currentUser}
                  >
                    {isSubmitting ? (
                      'Posting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Post Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies */}
      <AnimatePresence>
        {showReplies && post.replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200 space-y-4"
          >
            {post.replies.map((reply) => (
              <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{reply.author}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{getTimeAgo(reply.createdAt)}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap text-sm">{reply.content}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PostCard
