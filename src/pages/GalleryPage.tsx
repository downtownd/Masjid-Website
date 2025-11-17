import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import Gallery from '../components/Gallery'

const GalleryPage = () => {
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
            <Camera className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              Moments from our community - prayers, events, and gatherings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="container-custom py-12">
        <Gallery />
      </section>
    </div>
  )
}

export default GalleryPage
