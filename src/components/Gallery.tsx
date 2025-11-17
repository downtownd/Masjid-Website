import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { GalleryImage } from '../types'

const Gallery = ({ limit }: { limit?: number }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Gallery images from Islamic Center of Modesto - 53 photos
  const images: GalleryImage[] = [
    // Prayer Hall Photos
    { id: '1', url: '/masjid-1.png', title: 'Islamic Center of Modesto', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '2', url: '/masjid-2.png', title: 'Main Prayer Hall', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '4', url: '/masjid-4.png', title: 'Prayer Space', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '7', url: '/masjid-7.png', title: 'Prayer Area', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '10', url: '/masjid-10.png', title: 'Prayer Hall Interior', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '13', url: '/masjid-13.png', title: 'Prayer Room', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '16', url: '/masjid-16.png', title: 'Prayer Facility', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '19', url: '/masjid-19.png', title: 'Prayer Hall View', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '22', url: '/masjid-22.png', title: 'Prayer Space', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '25', url: '/masjid-25.png', title: 'Prayer Area', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '28', url: '/masjid-28.png', title: 'Prayer Hall', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '31', url: '/masjid-31.png', title: 'Prayer Room', category: 'prayer', uploadDate: '2024-11-17' },
    { id: '34', url: '/masjid-34.png', title: 'Prayer Facility', category: 'prayer', uploadDate: '2024-11-17' },

    // Community Events Photos
    { id: '3', url: '/masjid-3.png', title: 'Community Gathering', category: 'events', uploadDate: '2024-11-17' },
    { id: '6', url: '/masjid-6.png', title: 'Community Event', category: 'events', uploadDate: '2024-11-17' },
    { id: '9', url: '/masjid-9.png', title: 'Community Activity', category: 'events', uploadDate: '2024-11-17' },
    { id: '12', url: '/masjid-12.png', title: 'Community Program', category: 'events', uploadDate: '2024-11-17' },
    { id: '15', url: '/masjid-15.png', title: 'Community Gathering', category: 'events', uploadDate: '2024-11-17' },
    { id: '18', url: '/masjid-18.png', title: 'Community Event', category: 'events', uploadDate: '2024-11-17' },
    { id: '21', url: '/masjid-21.png', title: 'Community Activity', category: 'events', uploadDate: '2024-11-17' },
    { id: '24', url: '/masjid-24.png', title: 'Community Program', category: 'events', uploadDate: '2024-11-17' },
    { id: '27', url: '/masjid-27.png', title: 'Community Gathering', category: 'events', uploadDate: '2024-11-17' },
    { id: '30', url: '/masjid-30.png', title: 'Community Event', category: 'events', uploadDate: '2024-11-17' },
    { id: '33', url: '/masjid-33.png', title: 'Community Activity', category: 'events', uploadDate: '2024-11-17' },
    { id: '36', url: '/masjid-36.png', title: 'Community Program', category: 'events', uploadDate: '2024-11-17' },
    { id: '39', url: '/masjid-39.png', title: 'Community Gathering', category: 'events', uploadDate: '2024-11-17' },

    // Education Programs Photos
    { id: '8', url: '/masjid-8.png', title: 'Islamic Education', category: 'education', uploadDate: '2024-11-17' },
    { id: '11', url: '/masjid-11.png', title: 'Learning Session', category: 'education', uploadDate: '2024-11-17' },
    { id: '14', url: '/masjid-14.png', title: 'Islamic Classes', category: 'education', uploadDate: '2024-11-17' },
    { id: '17', url: '/masjid-17.png', title: 'Education Program', category: 'education', uploadDate: '2024-11-17' },
    { id: '20', url: '/masjid-20.png', title: 'Learning Activity', category: 'education', uploadDate: '2024-11-17' },
    { id: '23', url: '/masjid-23.png', title: 'Islamic Studies', category: 'education', uploadDate: '2024-11-17' },
    { id: '26', url: '/masjid-26.png', title: 'Education Session', category: 'education', uploadDate: '2024-11-17' },
    { id: '29', url: '/masjid-29.png', title: 'Learning Program', category: 'education', uploadDate: '2024-11-17' },
    { id: '32', url: '/masjid-32.png', title: 'Islamic Education', category: 'education', uploadDate: '2024-11-17' },
    { id: '35', url: '/masjid-35.png', title: 'Learning Session', category: 'education', uploadDate: '2024-11-17' },

    // Facilities Photos
    { id: '5', url: '/masjid-5.png', title: 'Masjid Facilities', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '37', url: '/masjid-37.png', title: 'Facility Interior', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '38', url: '/masjid-38.png', title: 'Masjid Building', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '40', url: '/masjid-40.png', title: 'Facility View', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '41', url: '/masjid-41.png', title: 'Building Interior', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '42', url: '/masjid-42.png', title: 'Facility Space', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '43', url: '/masjid-43.png', title: 'Masjid Facility', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '44', url: '/masjid-44.png', title: 'Building View', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '45', url: '/masjid-45.png', title: 'Facility Interior', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '46', url: '/masjid-46.png', title: 'Masjid Space', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '47', url: '/masjid-47.png', title: 'Building Facility', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '48', url: '/masjid-48.png', title: 'Facility Area', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '49', url: '/masjid-49.png', title: 'Masjid Interior', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '50', url: '/masjid-50.png', title: 'Building Space', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '51', url: '/masjid-51.png', title: 'Facility View', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '52', url: '/masjid-52.png', title: 'Masjid Facility', category: 'facilities', uploadDate: '2024-11-17' },
    { id: '53', url: '/masjid-53.png', title: 'Building Interior', category: 'facilities', uploadDate: '2024-11-17' },
  ]

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'prayer', label: 'Prayer Hall' },
    { id: 'education', label: 'Education' },
    { id: 'events', label: 'Events' },
    { id: 'facilities', label: 'Facilities' },
  ]

  const filteredImages = images
    .filter((img) => selectedCategory === 'all' || img.category === selectedCategory)
    .slice(0, limit)

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const handlePrevious = () => {
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const handleNext = () => {
    const newIndex =
      currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
              transition-all duration-200
              ${
                selectedCategory === category.id
                  ? 'bg-islamic-green text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleImageClick(image, index)}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm">{image.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50"
              onClick={() => setSelectedImage(null)}
            />

            {/* Image Viewer */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-6xl max-h-[90vh] relative"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h2 className="text-white text-2xl font-bold mb-1">
                    {selectedImage.title}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
