
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './Slideshow';

// All images from the public directory
const ALL_IMAGES = [
  'WhatsApp Image 2025-12-29 at 08.25.27.jpeg',
  'WhatsApp Image 2025-12-29 at 08.25.28.jpeg',
  'WhatsApp Image 2025-12-29 at 08.29.49.jpeg',
  'WhatsApp Image 2025-12-29 at 08.32.05.jpeg',
  'WhatsApp Image 2025-12-29 at 08.32.05 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 08.32.05 (2).jpeg',
  'WhatsApp Image 2025-12-29 at 08.32.06.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.26.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.33.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.34.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.34 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.35.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.35 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.35 (2).jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.36.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.36 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.37.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.37 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.38.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.38 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.39.jpeg',
  'WhatsApp Image 2025-12-29 at 08.54.39 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.39.jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.39 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.39 (2).jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.39 (3).jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.40.jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.40 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.41.jpeg',
  'WhatsApp Image 2025-12-29 at 09.02.41 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 09.56.22.jpeg',
  'WhatsApp Image 2025-12-29 at 09.56.23.jpeg',
  'WhatsApp Image 2025-12-29 at 09.56.23 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 09.56.23 (2).jpeg',
  'WhatsApp Image 2025-12-29 at 09.56.24.jpeg',
  'WhatsApp Image 2025-12-29 at 09.56.24 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 13.45.07.jpeg',
  'WhatsApp Image 2025-12-29 at 14.01.01.jpeg',
  'WhatsApp Image 2025-12-29 at 14.02.43.jpeg',
  'WhatsApp Image 2025-12-29 at 14.04.49.jpeg',
  'WhatsApp Image 2025-12-29 at 14.05.34.jpeg',
  'WhatsApp Image 2025-12-29 at 14.06.14.jpeg',
  'WhatsApp Image 2025-12-29 at 14.07.27.jpeg',
  'WhatsApp Image 2025-12-29 at 14.09.45.jpeg',
  'WhatsApp Image 2025-12-29 at 14.10.42.jpeg',
  'WhatsApp Image 2025-12-29 at 14.14.11.jpeg',
  'WhatsApp Image 2025-12-29 at 14.14.55.jpeg',
  'WhatsApp Image 2025-12-29 at 14.15.54.jpeg',
  'WhatsApp Image 2025-12-29 at 14.18.57.jpeg',
  'WhatsApp Image 2025-12-29 at 14.19.46.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.10.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.10 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.40.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.47.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.47 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.49.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.49 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.50.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.50 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.50 (2).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.50 (3).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.50 (4).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.50 (5).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (2).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (3).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (4).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (5).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (6).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (7).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.51 (8).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.52.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.52 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.52 (2).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.52 (3).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.52 (4).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.53.jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.53 (1).jpeg',
  'WhatsApp Image 2025-12-29 at 14.22.53 (2).jpeg',
];

interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalImages: number;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, onClose, onNext, onPrev, currentIndex, totalImages }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all duration-300 z-50"
      >
        <i className="fas fa-times text-xl"></i>
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20 text-amber-400 text-sm font-medium z-50">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all duration-300 z-50"
      >
        <i className="fas fa-chevron-left text-xl"></i>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all duration-300 z-50"
      >
        <i className="fas fa-chevron-right text-xl"></i>
      </button>

      {/* Image */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="max-w-[90vw] max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({});

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % ALL_IMAGES.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? ALL_IMAGES.length - 1 : selectedImage - 1);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="w-full min-h-screen p-6 md:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h2 className="font-playfair text-4xl md:text-6xl text-amber-400 mb-4">Memory Gallery</h2>
        <p className="text-amber-200/60 text-lg max-w-2xl">
          A complete collection of {ALL_IMAGES.length} cherished moments from Kudzie's incredible journey. 
          Click any image to view in full size.
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {ALL_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-zinc-900 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
              onClick={() => openLightbox(index)}
              style={{ aspectRatio: '1' }}
            >
              {/* Image Container */}
              <div className="absolute inset-0">
                <img
                  src={`/${image}`}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onLoad={() => setImageLoadStates(prev => ({ ...prev, [index]: true }))}
                />
                
                {/* Loading State */}
                {!imageLoadStates[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <div className="w-8 h-8 border-b-2 border-amber-500 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex items-center gap-2 text-white">
                    <i className="fas fa-expand text-sm"></i>
                    <span className="text-xs uppercase tracking-wider">View Full Size</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            imageUrl={`/${ALL_IMAGES[selectedImage]}`}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            currentIndex={selectedImage}
            totalImages={ALL_IMAGES.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
