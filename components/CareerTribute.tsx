
import React from 'react';
import { motion } from 'framer-motion';

const CareerTribute: React.FC = () => {
  const achievements = [
    { title: "Academic Excellence", desc: "Foundations laid at Daramombe and beyond, fueled by a sharp mind.", icon: "fa-graduation-cap" },
    { title: "Professional Growth", desc: "Rising through the ranks with integrity and unmatched dedication.", icon: "fa-chart-line" },
    { title: "Leadership", desc: "A pillar in the ESIA community, leading by example and vision.", icon: "fa-award" },
    { title: "Global Perspective", desc: "Connecting local roots with international standards of excellence.", icon: "fa-globe" }
  ];

  return (
    <div className="min-h-screen bg-zinc-900/50 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-playfair text-5xl md:text-7xl text-white mb-6"
          >
            40 Years of <span className="text-amber-500">Excellence</span>
          </motion.h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Kudzie's career isn't just about titles; it's about the impact made, the bridges built, and the legacy of professional integrity he carries forward.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-zinc-800/50 border border-white/5 rounded-2xl relative group"
            >
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                <i className={`fas ${item.icon} text-2xl text-amber-500 group-hover:text-black transition-colors`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 bg-amber-500 rounded-3xl md:flex items-center justify-between text-black"
        >
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h3 className="font-playfair text-4xl mb-4">A Note of Appreciation</h3>
            <p className="text-black/70 text-lg italic">
              "Kudzie, your dedication to your family and your craft serves as an inspiration to everyone you touch. As you cross this 40-year milestone, the ESIA and your colleagues salute your journey of brilliance."
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-black/10 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-quote-right text-4xl"></i>
            </div>
            <p className="font-bold uppercase tracking-tighter">Career Milestone 2025</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerTribute;
