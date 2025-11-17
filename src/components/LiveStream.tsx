import { useState } from 'react'
import { Youtube, Radio, Play, Video } from 'lucide-react'

const LiveStream = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'recordings'>('live')

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
          {/* Live Stream Section - Islamic Center of Modesto */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="font-bold text-red-600 text-lg">CHECK IF WE'RE LIVE</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-islamic-dark mb-3">
              Islamic Center of Modesto Live Stream
            </h3>
            <p className="text-gray-700 mb-6">
              Watch our live broadcasts on YouTube! We stream Jumu'ah prayers, special lectures, and community events.
            </p>

            {/* Jumu'ah Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-islamic-dark">Jumu'ah 1</div>
                <div className="text-gray-600">Fridays at 12:00 PM</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-islamic-dark">Jumu'ah 2</div>
                <div className="text-gray-600">Fridays at 1:00 PM</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-islamic-dark">Jumu'ah 3</div>
                <div className="text-gray-600">Fridays at 2:00 PM</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.youtube.com/@icomodesto/live"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Radio className="w-5 h-5" />
                Watch Live on YouTube
              </a>
              <a
                href="https://www.youtube.com/@icomodesto/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white hover:bg-gray-50 text-islamic-dark font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg border-2 border-gray-200"
              >
                <Play className="w-5 h-5" />
                View Past Streams
              </a>
            </div>

            <p className="text-sm text-gray-600 mt-6 text-center">
              Click "Watch Live on YouTube" to see if we're currently streaming. If not live, you'll see our channel page.
            </p>
          </div>

          {/* Embedded YouTube Channel */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed?listType=user_uploads&list=icomodesto"
              title="Islamic Center of Modesto - Latest Videos"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-sm text-gray-500 text-center mt-3">
            Latest uploads from Islamic Center of Modesto
          </p>
        </div>
      ) : (
        <div>
          {/* YouTube Videos & Recordings Section */}
          <div className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-xl p-8 border border-gray-200 text-center">
            <Video className="w-16 h-16 mx-auto text-islamic-green mb-4" />
            <h3 className="text-2xl font-bold text-islamic-dark mb-3">
              Video Library
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Watch our collection of recorded khutbahs, lectures, special events, and educational content on our YouTube channel.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://www.youtube.com/@icomodesto/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Radio className="w-5 h-5" />
                View Past Streams
              </a>
              <a
                href="https://www.youtube.com/@icomodesto/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" />
                Browse All Videos
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <Radio className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-bold text-islamic-dark mb-1">Live Streams</h4>
                <p className="text-sm text-gray-600">
                  All Jumu'ah prayers and special events recorded
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-islamic-dark mb-1">Khutbahs</h4>
                <p className="text-sm text-gray-600">
                  Weekly Islamic lectures and Friday sermons
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-islamic-dark mb-1">Education</h4>
                <p className="text-sm text-gray-600">
                  Islamic education and community programs
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="https://www.youtube.com/@icomodesto"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-islamic-green hover:text-teal-700 font-semibold transition-colors"
        >
          <Youtube className="w-5 h-5" />
          Subscribe on YouTube @icomodesto
        </a>
      </div>
    </div>
  )
}

export default LiveStream
