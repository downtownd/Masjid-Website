import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { GalleryImage } from '../types'

const Gallery = ({ limit }: { limit?: number }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Gallery images from Islamic Center of Modesto
  const images: GalleryImage[] = [
    {
      id: '1',
      url: '/masjid-1.png',
      title: 'Islamic Center of Modesto',
      category: 'facilities',
      uploadDate: '2024-11-17',
    },
    {
      id: '2',
      url: '/masjid-2.png',
      title: 'Main Prayer Hall',
      category: 'prayer',
      uploadDate: '2024-11-17',
    },
    {
      id: '3',
      url: '/masjid-3.png',
      title: 'Community Gathering',
      category: 'events',
      uploadDate: '2024-11-17',
    },
    {
      id: '4',
      url: '/masjid-4.png',
      title: 'Prayer Space',
      category: 'prayer',
      uploadDate: '2024-11-17',
    },
    {
      id: '5',
      url: '/masjid-5.png',
      title: 'Masjid Facilities',
      category: 'facilities',
      uploadDate: '2024-11-17',
    },
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
