
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS } from './constants';
import Slideshow from './components/Slideshow';
import Header from './components/Header';
import Timeline from './components/Timeline';
import CareerTribute from './components/CareerTribute';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [view, setView] = useState<'slideshow' | 'timeline' | 'tribute' | 'gallery'>('slideshow');

  // Flatten photos for navigation
  const allPhotos = CHAPTERS.flatMap(c => c.photos);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent"></div>
      </div>

      <Header 
        currentView={view} 
        setView={setView} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
      />

      <main className="flex-grow flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {view === 'slideshow' && (
            <motion.div
              key="slideshow"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="flex-grow flex items-center justify-center p-4 md:p-8"
            >
              <Slideshow 
                isPlaying={isPlaying} 
                onChapterChange={(idx) => setCurrentChapterIndex(idx)}
              />
            </motion.div>
          )}

          {view === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex-grow p-4 md:p-12"
            >
              <Timeline chapters={CHAPTERS} />
            </motion.div>
          )}

          {view === 'tribute' && (
            <motion.div
              key="tribute"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex-grow"
            >
              <CareerTribute />
            </motion.div>
          )}

          {view === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-grow"
            >
              <Gallery />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-4 bg-black/80 border-t border-amber-900/30 text-center text-xs text-amber-200/50 backdrop-blur-md">
        Celebrating Kudzie's 40th Birthday & Career Milestones &bull; Est. 1985
      </footer>
    </div>
  );
};

export default App;
