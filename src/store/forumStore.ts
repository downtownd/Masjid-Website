import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ForumPost, ForumReply, ForumUser, ForumCategory } from '../types'
import { moderateContent } from '../utils/contentModeration'

interface ForumState {
  posts: ForumPost[]
  currentUser: ForumUser | null
  setCurrentUser: (user: ForumUser | null) => void
  createPost: (
    category: ForumCategory,
    title: string,
    content: string
  ) => { success: boolean; message: string }
  createReply: (postId: string, content: string) => { success: boolean; message: string }
  deletePost: (postId: string) => void
  deleteReply: (postId: string, replyId: string) => void
  togglePinPost: (postId: string) => void
  toggleLockPost: (postId: string) => void
  getPostsByCategory: (category: ForumCategory) => ForumPost[]
  searchPosts: (query: string) => ForumPost[]
}

export const useForumStore = create<ForumState>()(
  persist(
    (set, get) => ({
      posts: [],
      currentUser: null,

      setCurrentUser: (user) => set({ currentUser: user }),

      createPost: (category, title, content) => {
        const currentUser = get().currentUser
        if (!currentUser) {
          return { success: false, message: 'Please set your name and email first' }
        }

        // Moderate title
        const titleModeration = moderateContent(title)
        if (!titleModeration.isClean) {
          return { success: false, message: `Title: ${titleModeration.reason}` }
        }

        // Moderate content
        const contentModeration = moderateContent(content)
        if (!contentModeration.isClean) {
          return { success: false, message: `Content: ${contentModeration.reason}` }
        }

        const newPost: ForumPost = {
          id: Date.now().toString(),
          category,
          title: titleModeration.cleanedContent || title,
          content: contentModeration.cleanedContent || content,
          author: currentUser.name,
          authorEmail: currentUser.email,
          createdAt: new Date().toISOString(),
          replies: [],
          isPinned: false,
          isLocked: false,
        }

        set((state) => ({
          posts: [newPost, ...state.posts],
        }))

        return { success: true, message: 'Post created successfully!' }
      },

      createReply: (postId, content) => {
        const currentUser = get().currentUser
        if (!currentUser) {
          return { success: false, message: 'Please set your name and email first' }
        }

        const post = get().posts.find((p) => p.id === postId)
        if (!post) {
          return { success: false, message: 'Post not found' }
        }

        if (post.isLocked) {
          return { success: false, message: 'This post is locked' }
        }

        // Moderate content
        const moderation = moderateContent(content)
        if (!moderation.isClean) {
          return { success: false, message: moderation.reason || 'Content failed moderation' }
        }

        const newReply: ForumReply = {
          id: Date.now().toString(),
          postId,
          content: moderation.cleanedContent || content,
          author: currentUser.name,
          authorEmail: currentUser.email,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p
          ),
        }))

        return { success: true, message: 'Reply posted successfully!' }
      },

      deletePost: (postId) => {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== postId),
        }))
      },

      deleteReply: (postId, replyId) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId
              ? { ...p, replies: p.replies.filter((r) => r.id !== replyId) }
              : p
          ),
        }))
      },

      togglePinPost: (postId) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, isPinned: !p.isPinned } : p
          ),
        }))
      },

      toggleLockPost: (postId) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, isLocked: !p.isLocked } : p
          ),
        }))
      },

      getPostsByCategory: (category) => {
        return get().posts.filter((p) => p.category === category)
      },

      searchPosts: (query) => {
        const lowerQuery = query.toLowerCase()
        return get().posts.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.content.toLowerCase().includes(lowerQuery)
        )
      },
    }),
    {
      name: 'forum-storage',
    }
  )
)
