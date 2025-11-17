// Basic content moderation utility
// Filters inappropriate content and spam

const INAPPROPRIATE_WORDS = [
  'spam',
  'scam',
  // Add more inappropriate words as needed
  // This is a basic list - in production, use a comprehensive moderation API
]

const SPAM_PATTERNS = [
  /\b(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.[a-z]{2,}\/[^\s]{20,}/gi, // Long URLs
  /\b(?:click here|buy now|limited time|act now)\b/gi, // Spam phrases
  /(.)\1{4,}/g, // Repeated characters (aaaaa)
]

export interface ModerationResult {
  isClean: boolean
  reason?: string
  cleanedContent?: string
}

export const moderateContent = (content: string): ModerationResult => {
  const lowerContent = content.toLowerCase()

  // Check for inappropriate words
  for (const word of INAPPROPRIATE_WORDS) {
    if (lowerContent.includes(word.toLowerCase())) {
      return {
        isClean: false,
        reason: 'Content contains inappropriate language',
      }
    }
  }

  // Check for spam patterns
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(content)) {
      return {
        isClean: false,
        reason: 'Content appears to be spam',
      }
    }
  }

  // Check for excessive caps
  const capsCount = (content.match(/[A-Z]/g) || []).length
  const totalLetters = (content.match(/[a-zA-Z]/g) || []).length
  if (totalLetters > 10 && capsCount / totalLetters > 0.7) {
    return {
      isClean: false,
      reason: 'Excessive use of capital letters',
    }
  }

  // Check minimum length
  if (content.trim().length < 3) {
    return {
      isClean: false,
      reason: 'Content is too short',
    }
  }

  // Check maximum length
  if (content.length > 5000) {
    return {
      isClean: false,
      reason: 'Content exceeds maximum length (5000 characters)',
    }
  }

  return {
    isClean: true,
    cleanedContent: content.trim(),
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUsername = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50
}
