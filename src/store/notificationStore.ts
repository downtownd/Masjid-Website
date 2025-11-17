import { create } from 'zustand'

interface NotificationStore {
  permission: NotificationPermission
  enabled: boolean
  showPrompt: boolean
  requestPermission: () => Promise<void>
  sendNotification: (title: string, options?: NotificationOptions) => void
  hidePrompt: () => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  permission: 'default',
  enabled: false,
  showPrompt: false,

  requestPermission: async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications')
      return
    }

    if (Notification.permission === 'granted') {
      set({ permission: 'granted', enabled: true, showPrompt: false })
      return
    }

    if (Notification.permission === 'default') {
      set({ showPrompt: true })
    }
  },

  sendNotification: (title: string, options?: NotificationOptions) => {
    const { permission, enabled } = get()

    if (!enabled || permission !== 'granted') {
      return
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/mosque-icon.svg',
        badge: '/mosque-icon.svg',
        ...options,
      })
    }
  },

  hidePrompt: () => {
    set({ showPrompt: false })
  },
}))

// Schedule prayer time notifications
// This would be implemented with a service worker in production
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const schedulePrayerNotifications = (_prayerTimes: any) => {
  // Implementation would check prayer times and schedule notifications
  // Example: sendNotification(`${prayer} time is approaching`, {
  //   body: 'Prayer will begin in 15 minutes',
  //   tag: 'prayer-reminder',
  // })
}
