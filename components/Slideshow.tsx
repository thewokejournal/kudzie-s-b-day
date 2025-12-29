
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS, SLIDE_DURATION } from '../constants';

interface SlideshowProps {
  isPlaying: boolean;
  onChapterChange: (idx: number) => void;
}

export const ImageWithFallback: React.FC<{ 
  src: string; 
  alt: string; 
  className: string;
  index?: number; 
}> = ({ src, alt, className }) => {
  const [currentUrlIdx, setCurrentUrlIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Aggressive discovery for environment-specific assets
  const fallbacks = [
    src, // Primary (e.g., input_file_27.png)
    src.replace('.png', '.jpg'),
    src.replace('.png', '.jpeg'),
    src.replace('input_file_', 'photo'), // Sometimes users upload as photo1.jpg
    `photo${src.match(/\d+/)?.[0] || '1'}.jpg`,
    `photo${src.match(/\d+/)?.[0] || '1'}.png`,
  ].filter((v, i, a) => a.indexOf(v) === i); // Unique paths only

  const currentUrl = fallbacks[currentUrlIdx];

  useEffect(() => {
    setCurrentUrlIdx(0);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (currentUrlIdx < fallbacks.length - 1) {
      setCurrentUrlIdx(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
          <div className="w-12 h-12 border-b-2 border-amber-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/90 p-8 text-center">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-image text-amber-500/20 text-3xl"></i>
          </div>
          <p className="text-sm font-playfair text-zinc-400 mb-2">Memory Loading...</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest max-w-[200px]">
            Please wait while we locate this memory in the archive.
          </p>
          <div className="mt-4 opacity-10 text-[8px] font-mono break-all">{src}</div>
        </div>
      ) : (
        <motion.img
          key={currentUrl}
          src={currentUrl}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ 
            scale: isLoaded ? 1.02 : 1.15, 
            opacity: isLoaded ? 1 : 0 
          }}
          transition={{ 
            scale: { duration: 15, ease: "linear" },
            opacity: { duration: 0.8 }
          }}
          className={`${className} w-full h-full object-cover`}
        />
      )}
    </div>
  );
};

const Slideshow: React.FC<SlideshowProps> = ({ isPlaying, onChapterChange }) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentChapter = CHAPTERS[currentChapterIdx];
  const currentPhoto = currentChapter.photos[currentPhotoIdx];
  const allPhotos = CHAPTERS.flatMap(c => c.photos);

  const nextSlide = () => {
    if (currentPhotoIdx < currentChapter.photos.length - 1) {
      setCurrentPhotoIdx(prev => prev + 1);
    } else {
      const nextChapterIdx = (currentChapterIdx + 1) % CHAPTERS.length;
      setCurrentChapterIdx(nextChapterIdx);
      setCurrentPhotoIdx(0);
      onChapterChange(nextChapterIdx);
    }
    setProgress(0);
  };

  const prevSlide = () => {
    if (currentPhotoIdx > 0) {
      setCurrentPhotoIdx(prev => prev - 1);
    } else {
      const prevChapterIdx = currentChapterIdx === 0 ? CHAPTERS.length - 1 : currentChapterIdx - 1;
      setCurrentChapterIdx(prevChapterIdx);
      setCurrentPhotoIdx(CHAPTERS[prevChapterIdx].photos.length - 1);
      onChapterChange(prevChapterIdx);
    }
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const tick = 50;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (tick / SLIDE_DURATION) * 100;
      });
    }, tick);
    return () => clearInterval(interval);
  }, [isPlaying, currentChapterIdx, currentPhotoIdx]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  return (
    <div className={`relative w-full group transition-all duration-500 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 max-w-none h-screen' 
        : 'max-w-6xl h-[70vh] md:h-[85vh]'
    }`}>
      {/* Decorative Glow */}
      <div className={`absolute -inset-10 bg-amber-500/10 blur-[150px] rounded-full opacity-40 animate-pulse pointer-events-none ${isFullscreen ? 'hidden' : ''}`}></div>

      <div className={`relative w-full h-full overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.95)] bg-black ${
        isFullscreen ? 'rounded-none border-0' : 'rounded-[3rem] border border-white/5'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <ImageWithFallback 
              src={currentPhoto.url} 
              alt={currentPhoto.caption}
              className="w-full h-full object-cover"
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60"></div>
          </motion.div>
        </AnimatePresence>

        {/* Caption Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 z-20 pointer-events-none transition-all duration-500 ${
          isFullscreen ? 'p-6 md:p-10' : 'p-12 md:p-24'
        }`}>
          <motion.div
            key={`text-${currentPhoto.id}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className={`flex items-center gap-5 transition-all duration-500 ${
              isFullscreen ? 'mb-3' : 'mb-8'
            }`}>
              <span className={`bg-amber-500 text-black font-black px-5 py-2 rounded-full uppercase tracking-tighter shadow-2xl transition-all duration-500 ${
                isFullscreen ? 'text-[9px]' : 'text-[11px]'
              }`}>
                {currentPhoto.year}
              </span>
              <div className={`h-px bg-amber-500/30 transition-all duration-500 ${
                isFullscreen ? 'w-8' : 'w-12'
              }`}></div>
              <span className={`text-amber-200/50 tracking-[0.5em] uppercase font-bold transition-all duration-500 ${
                isFullscreen ? 'text-[8px]' : 'text-[10px]'
              }`}>
                {currentChapter.title}
              </span>
            </div>
            
            <h2 className={`font-playfair text-white leading-[1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] transition-all duration-500 ${
              isFullscreen ? 'text-2xl md:text-4xl mb-2' : 'text-5xl md:text-8xl mb-8'
            }`}>
              {currentPhoto.caption}
            </h2>
            
            {!isFullscreen && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-amber-50/40 text-sm md:text-xl max-w-2xl italic font-light leading-relaxed"
              >
                {currentChapter.description}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-1000 z-30">
          <button onClick={prevSlide} className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all duration-500">
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          <button onClick={nextSlide} className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all duration-500">
            <i className="fas fa-chevron-right text-xl"></i>
          </button>
        </div>

        {/* Fullscreen Toggle Button */}
        <button 
          onClick={toggleFullscreen}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all duration-500 opacity-0 group-hover:opacity-100 z-30 pointer-events-auto"
          title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen'}
        >
          <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-lg`}></i>
        </button>

        {/* Cinematic Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex gap-1 px-1.5 z-40 bg-black/80 backdrop-blur-md">
          {allPhotos.map((photo, pIdx) => {
            const currentFlatIdx = allPhotos.findIndex(p => p.id === currentPhoto.id);
            return (
              <div key={photo.id} className="h-full flex-grow relative bg-white/5 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,1)] transition-all duration-100 ease-linear" 
                  style={{ 
                    width: pIdx === currentFlatIdx ? `${progress}%` : pIdx < currentFlatIdx ? '100%' : '0%' 
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
