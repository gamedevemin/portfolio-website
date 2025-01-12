import React, { useState, useEffect } from 'react';
import { Moon, Sun, Gamepad2, Code2, Github, Linkedin, Youtube, Phone } from 'lucide-react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Navigation } from './components/Navigation';
import { AchievementPopup } from './components/AchievementPopup';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievement, setAchievement] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Yapay yükleme süresi
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const newLevel = Math.floor(xp / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setAchievement(`Level Up! You're now level ${newLevel}`);
      setTimeout(() => setAchievement(null), 3000);
    }
  }, [xp, level]);

  const addXP = (amount: number) => {
    setXp(prev => prev + amount);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {isLoading ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-50">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-xl mb-2">Yükleniyor...</p>
          <p className="text-sm text-gray-400">🤖 Bu portfolyo yapay zeka destekli olarak geliştirilmiştir</p>
          <p className="text-xs text-gray-500 mt-1">Powered by AI | Built with Claude</p>
        </div>
      ) : (
        <>
          {achievement && <AchievementPopup message={achievement} />}
          
          <div className="fixed top-4 right-4 flex gap-4 z-50">
            <div className="bg-gray-800 dark:bg-gray-700 rounded-full px-4 py-2 text-white flex items-center gap-2">
              <Gamepad2 size={20} />
              <span>Level {level}</span>
            </div>
            <div className="bg-gray-800 dark:bg-gray-700 rounded-full px-4 py-2 text-white flex items-center gap-2">
              <Code2 size={20} />
              <span>{xp} XP</span>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-gray-800 dark:bg-gray-700 text-white"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <Navigation />
          
          <main className="container mx-auto px-4 py-8">
            <Hero addXP={addXP} />
            <About addXP={addXP} />
            <Skills addXP={addXP} />
            <Projects addXP={addXP} />
          </main>
          
          <div className="container mx-auto px-4 mb-8">
            <div className="flex justify-center gap-12 opacity-30 grayscale">
              <img src="/images/unreal-engine-logo.png" alt="Unreal Engine" className="h-12" />
              <img src="/images/ai-star-logo.png" alt="AI Technology" className="h-12" />
              <img src="/images/cpp-logo.png" alt="C++" className="h-12" />
              <img src="/images/unicorn-logo.png" alt="Startup Vision" className="h-12" />
            </div>
          </div>
          
          <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
            <div className="flex justify-center gap-6 mb-4">
              <a href="https://github.com/gamedevemin" target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/devemin" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://www.youtube.com/@emincelenk" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
              <a href="https://wa.me/905373420161" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors">
                <Phone size={24} />
              </a>
            </div>
            <p>© 2024 Muhammed Emin Çelenk | Game Developer & Software Solutions</p>
          </footer>
        </>
      )}
    </div>
  );
}