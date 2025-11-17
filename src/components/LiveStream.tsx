import { useState } from 'react'
import { motion } from 'framer-motion'
import { Youtube, Radio, Play } from 'lucide-react'

const LiveStream = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'recordings'>('live')

  // Mock data - would come from API/CMS
  const recordedKhutbahs = [
    {
      id: '1',
      title: 'The Importance of Prayer in Our Daily Lives',
      speaker: 'Sheikh Ahmed Khan',
      date: 'March 8, 2024',
      duration: '45:32',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: '2',
      title: 'Seeking Knowledge in Islam',
      speaker: 'Dr. Fatima Hassan',
      date: 'March 1, 2024',
      duration: '52:18',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: '3',
      title: 'Building Strong Muslim Families',
      speaker: 'Imam Abdullah Rahman',
      date: 'February 23, 2024',
      duration: '38:45',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-islamic-dark flex items-center gap-2">
          <Youtube className="w-8 h-8 text-red-600" />
          Khutbahs & Lectures
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('live')}
          className={`
            flex-1 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${
              activeTab === 'live'
                ? 'bg-white text-islamic-green shadow-md'
                : 'text-gray-600 hover:text-islamic-green'
            }
          `}
        >
          <Radio className="w-5 h-5" />
          Live Stream
        </button>
        <button
          onClick={() => setActiveTab('recordings')}
          className={`
            flex-1 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${
              activeTab === 'recordings'
                ? 'bg-white text-islamic-green shadow-md'
                : 'text-gray-600 hover:text-islamic-green'
            }
          `}
        >
          <Play className="w-5 h-5" />
          Recordings
        </button>
      </div>

      {activeTab === 'live' ? (
        <div>
          {/* Live Stream Embed */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 mb-4">
            {/* Replace with your actual YouTube live stream embed */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
              title="Live Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="font-bold text-red-600">LIVE</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-gray-700 font-medium">Jumu'ah Khutbah</span>
            </div>
            <p className="text-sm text-gray-600">
              Join us for today's Jumu'ah prayer. Stream starts at 12:30 PM EST
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordedKhutbahs.map((khutbah, index) => (
            <motion.div
              key={khutbah.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                <img
                  src={khutbah.thumbnail}
                  alt={khutbah.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {khutbah.duration}
                </div>
              </div>
              <h3 className="font-bold text-islamic-dark mb-1 group-hover:text-islamic-green transition-colors line-clamp-2">
                {khutbah.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{khutbah.speaker}</p>
              <p className="text-xs text-gray-500">{khutbah.date}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="https://youtube.com/@yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-islamic-green hover:text-teal-700 font-semibold transition-colors"
        >
          <Youtube className="w-5 h-5" />
          View all on YouTube
        </a>
      </div>
    </div>
  )
}

export default LiveStream
