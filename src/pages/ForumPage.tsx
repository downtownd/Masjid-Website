import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Store,
  Newspaper,
  MessageCircle,
  Plus,
  Search,
  
  
  
  User,
} from 'lucide-react'
import { useForumStore } from '../store/forumStore'
import { ForumCategory } from '../types'
import CreatePostModal from '../components/CreatePostModal'
import PostCard from '../components/PostCard'
import UserSetupModal from '../components/UserSetupModal'

const ForumPage = () => {
  const {
    posts,
    currentUser,
    getPostsByCategory,
    searchPosts,
  } = useForumStore()

  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showUserSetup, setShowUserSetup] = useState(false)

  const categories = [
    {
      id: 'all' as const,
      name: 'All Posts',
      icon: MessageSquare,
      description: 'View all forum posts',
      color: 'from-gray-500 to-gray-600',
    },
    {
      id: 'business' as ForumCategory,
      name: 'Community Businesses',
      icon: Store,
      description: 'Halal groceries, meat shops, hardware stores, and more',
      color: 'from-teal-500 to-teal-600',
    },
    {
      id: 'news' as ForumCategory,
      name: 'News & Announcements',
      icon: Newspaper,
      description: 'Community news, events, and important updates',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'general' as ForumCategory,
      name: 'General Discussion',
      icon: MessageCircle,
      description: 'General community conversation and questions',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const filteredPosts =
    searchQuery.length > 0
      ? searchPosts(searchQuery)
      : selectedCategory === 'all'
      ? posts
      : getPostsByCategory(selectedCategory as ForumCategory)

  // Sort posts: pinned first, then by date
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleCreatePostClick = () => {
    if (!currentUser) {
      setShowUserSetup(true)
    } else {
      setShowCreatePost(true)
    }
  }

  const getPostCount = (category: ForumCategory | 'all') => {
    if (category === 'all') return posts.length
    return getPostsByCategory(category).length
  }

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
            <MessageSquare className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Forum</h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto mb-6">
              Connect with fellow community members, share news, and discover local businesses
            </p>
            {currentUser && (
              <p className="text-teal-100">
                <User className="w-4 h-4 inline mr-2" />
                Posting as: {currentUser.name}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Category Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            const isSelected =
              selectedCategory === category.id ||
              (category.id === 'all' && selectedCategory === 'all')

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setSearchQuery('')
                }}
                className={`
                  relative p-6 rounded-xl text-left transition-all duration-200
                  ${
                    isSelected
                      ? 'bg-gradient-to-br ' + category.color + ' text-white shadow-lg scale-105'
                      : 'bg-white hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-islamic-green'}`} />
                  <span
                    className={`
                    text-xs font-bold px-2 py-1 rounded-full
                    ${isSelected ? 'bg-white/20' : 'bg-islamic-green/10 text-islamic-green'}
                  `}
                  >
                    {getPostCount(category.id)}
                  </span>
                </div>
                <h3
                  className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-islamic-dark'}`}
                >
                  {category.name}
                </h3>
                <p
                  className={`text-sm ${isSelected ? 'text-teal-50' : 'text-gray-600'}`}
                >
                  {category.description}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Search and Create Post */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="input-field pl-12 w-full"
            />
          </div>
          <button
            onClick={handleCreatePostClick}
            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {sortedPosts.length === 0 ? (
            <div className="card text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? 'No posts match your search'
                  : 'Be the first to start a conversation!'}
              </p>
              {!searchQuery && (
                <button onClick={handleCreatePostClick} className="btn-primary">
                  Create First Post
                </button>
              )}
            </div>
          ) : (
            sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
          )}
        </div>

        {/* Forum Guidelines */}
        <div className="mt-12 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-islamic-dark mb-4">Forum Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-bold mb-2">✓ Do:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Be respectful and kind to all members</li>
                <li>Share helpful information and resources</li>
                <li>Support local businesses</li>
                <li>Report inappropriate content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">✗ Don't:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Post spam or promotional content</li>
                <li>Use offensive or inappropriate language</li>
                <li>Share false information</li>
                <li>Engage in arguments or harassment</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-600 italic">
            All posts are automatically moderated. Inappropriate content will be blocked.
          </p>
        </div>
      </div>

      {/* Modals */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          defaultCategory={selectedCategory === 'all' ? 'general' : (selectedCategory as ForumCategory)}
        />
      )}
      {showUserSetup && (
        <UserSetupModal onClose={() => setShowUserSetup(false)} />
      )}
    </div>
  )
}

export default ForumPage
