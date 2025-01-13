import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';

interface HeroProps {
  keşifSkoru: number;
  addKeşifSkoru: (amount: number) => void;
}

export function Hero({ keşifSkoru, addKeşifSkoru }: HeroProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 relative group"
          onViewportEnter={() => addKeşifSkoru(5)}
        >
          {/* Outer glow effect */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-white via-gray-200 to-gray-100 rounded-full blur-lg opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-in-out" />
          
          {/* Main container with double border effect */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white via-gray-200 to-gray-100 rounded-full opacity-50 ring-2 ring-gray-300/30" />
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-300/50 overflow-hidden relative bg-black">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
              <img
                src="/images/emin.png"
                alt="Muhammed Emin Çelenk"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-bold text-white mb-8 text-center w-full px-4"
        >
          Muhammed Emin Çelenk
        </motion.h1>

        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 mb-8"
        >
          {/* Unreal Engine Developer Title */}
          <div 
            className="inline-flex items-center gap-4 px-6 py-2.5 sm:px-5 sm:py-1.5 rounded-full bg-gray-900/50 border border-gray-800 relative w-auto"
          >
            <img 
              src="/images/icons8-unreal-engine.svg"
              alt="Unreal Engine Logo"
              className="w-9 h-9 sm:w-5 sm:h-5 relative z-10"
            />
            <span className="text-sm sm:text-xs text-gray-300 relative z-10 whitespace-nowrap">Jr. Unreal Engine Oyun Geliştiricisi</span>
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center items-center gap-4"
        >
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-200 transition-colors duration-300 ease-out"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-200 transition-colors duration-300 ease-out"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://youtube.com/@yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-200 transition-colors duration-300 ease-out"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Youtube className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="mailto:your.email@example.com"
            className="text-gray-500 hover:text-gray-200 transition-colors duration-300 ease-out"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 