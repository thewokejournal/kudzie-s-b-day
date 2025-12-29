
import React from 'react';
import { motion } from 'framer-motion';
import { Chapter } from '../types';
import { ImageWithFallback } from './Slideshow';
import { CHAPTERS } from '../constants';

interface TimelineProps {
  chapters: Chapter[];
}

const Timeline: React.FC<TimelineProps> = ({ chapters }) => {
  const allPhotos = CHAPTERS.flatMap(c => c.photos);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Chronological Journey</span>
          <h2 className="font-playfair text-5xl md:text-7xl text-white mb-6">Four Decades of Grace</h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-8"></div>
        </motion.div>
      </header>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-amber-500/0 md:-translate-x-1/2"></div>

        {chapters.map((chapter, idx) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative mb-32 flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)] z-10 border-4 border-black"></div>
            
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
              <div className="grid grid-cols-2 gap-3">
                {chapter.photos.map(photo => {
                  const globalIdx = allPhotos.findIndex(p => p.id === photo.id);
                  return (
                    <div key={photo.id} className="aspect-square rounded-xl overflow-hidden border border-white/5">
                      <ImageWithFallback 
                        src={photo.url} 
                        alt={photo.caption} 
                        className="w-full h-full object-cover" 
                        index={globalIdx}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              <span className="font-playfair text-6xl md:text-8xl text-white/5 font-bold block mb-2">{chapter.photos[0].year}</span>
              <h3 className="text-2xl md:text-4xl font-playfair text-amber-500 mb-4">{chapter.title}</h3>
              <p className="text-zinc-400 text-lg mb-6 italic leading-relaxed">"{chapter.description}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
