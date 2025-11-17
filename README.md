# Community Masjid Website

A modern, feature-rich website for Islamic community centers built with React, TypeScript, and Tailwind CSS.

## Features

### Core Features
- **Live Prayer Times** - Auto-updating prayer times with API integration from Aladhan
  - Countdown timers to next prayer
  - Highlight current prayer time
  - Iqamah times
  - Special Jumu'ah notifications

- **Events Calendar** - Comprehensive event management
  - Category filtering (Youth, Sisters, Ramadan, Lectures, General)
  - RSVP/Registration system
  - Attendance tracking with progress bars
  - Add to calendar functionality

- **Donation System** - Easy and transparent donation management
  - Multiple causes (Masjid Fund, Construction, Zakat, Education)
  - One-time and recurring donations
  - Progress tracking with visual indicators
  - Custom amount options

### Interactive Features
- **Live Stream & Khutbah Library** - YouTube integration for live prayers and recordings
- **Announcements Banner** - Auto-rotating, auto-hiding announcements
- **Community Feedback Forms** - Multiple form types:
  - Volunteer sign-ups
  - Suggestion box
  - Ask-the-Imam (private)
  - Facility requests

### Design & UX
- **Mobile-First Design** - Fully responsive on all devices
- **Multilingual Support** - English, Arabic, Urdu, and Somali
- **Clean Navigation** - Intuitive menu with active state indicators
- **Photo Gallery** - Beautiful lightbox gallery with categories
- **Push Notifications** - Prayer reminders and event alerts

### Additional Features
- **Services Directory** - Complete list of masjid services
- **Contact Page** - Multiple contact methods with embedded map
- **Modern Animations** - Smooth transitions using Framer Motion
- **Accessibility** - WCAG compliant with proper ARIA labels

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Masjid-Website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Prayer Times API
The website uses the Aladhan API for prayer times. To customize:

1. Edit `src/utils/prayerTimesApi.ts`
2. Update the `latitude`, `longitude`, and `method` parameters
3. Available calculation methods:
   - 2: ISNA (Islamic Society of North America)
   - 3: MWL (Muslim World League)
   - 4: Makkah
   - 5: Egypt

### Customization

#### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  islamic: {
    green: '#0D9488',  // Primary color
    gold: '#D4AF37',   // Accent color
    dark: '#1E293B',   // Text color
  }
}
```

#### Translations
Add or modify translations in `src/i18n/translations.ts`

#### Content
- Events: Update `src/components/EventsCalendar.tsx`
- Services: Update `src/pages/ServicesPage.tsx`
- Donations: Update `src/components/DonationSection.tsx`

## Features Breakdown

### Prayer Times
- Real-time updates every minute
- Automatic current prayer detection
- Next prayer countdown
- Special Friday Jumu'ah banner
- Customizable Iqamah times

### Events System
- Filterable by category
- Visual attendance tracking
- Registration capacity management
- Responsive card layout
- Image support

### Donation Platform
- Multi-cause support
- One-time vs. recurring toggle
- Visual funding progress
- Preset and custom amounts
- Impact calculation

### Multilingual
- 4 languages supported
- RTL support for Arabic and Urdu
- Persistent language preference
- Easy to add more languages

### Notifications
- Browser push notifications
- Prayer time reminders
- Event notifications
- Announcement alerts
- Permission request modal

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── AnnouncementBanner.tsx
│   ├── ContactForms.tsx
│   ├── DonationSection.tsx
│   ├── EventsCalendar.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── LiveStream.tsx
│   ├── Navbar.tsx
│   ├── NotificationPermissionPrompt.tsx
│   └── PrayerTimes.tsx
├── pages/              # Page components
│   ├── ContactPage.tsx
│   ├── DonatePage.tsx
│   ├── EventsPage.tsx
│   ├── GalleryPage.tsx
│   ├── HomePage.tsx
│   └── ServicesPage.tsx
├── store/              # State management
│   ├── languageStore.ts
│   └── notificationStore.ts
├── types/              # TypeScript types
│   └── index.ts
├── utils/              # Utility functions
│   └── prayerTimesApi.ts
├── i18n/               # Translations
│   └── translations.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading for images
- Code splitting by route
- Optimized bundle size
- Cached API requests
- Service worker ready (for PWA)

## License

MIT License - feel free to use this for your community masjid!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.

## Credits

Built with love for the Muslim community.

May Allah accept this work and benefit the Ummah.
