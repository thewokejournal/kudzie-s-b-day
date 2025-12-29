
import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentView: 'slideshow' | 'timeline' | 'tribute';
  setView: (view: 'slideshow' | 'timeline' | 'tribute') => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, isPlaying, setIsPlaying }) => {
  return (
    <header className="sticky top-0 z-50 p-4 md:px-8 flex items-center justify-between bg-black/60 backdrop-blur-xl border-b border-amber-500/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          40
        </div>
        <div>
          <h1 className="font-playfair text-lg md:text-xl text-amber-400 leading-none">Kudzie's Journey</h1>
          <p className="text-[10px] md:text-xs text-amber-200/50 uppercase tracking-[0.2em]">Milestones & Memories</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {[
          { id: 'slideshow', label: 'Story', icon: 'fa-play' },
          { id: 'timeline', label: 'Timeline', icon: 'fa-timeline' },
          { id: 'tribute', label: 'Career Tribute', icon: 'fa-briefcase' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`flex items-center gap-2 transition-all hover:text-amber-400 ${
              currentView === item.id ? 'text-amber-500 underline underline-offset-8' : 'text-zinc-400'
            }`}
          >
            <i className={`fas ${item.icon}`}></i>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-500 hover:bg-amber-500/10 transition-colors"
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        
        {/* Mobile Menu Trigger - simple version */}
        <div className="md:hidden">
          <button className="text-amber-500"><i className="fas fa-bars text-xl"></i></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
