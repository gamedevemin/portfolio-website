import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Portfolio } from './pages/portfolio';
import { Services } from './pages/services';
import { Education } from './pages/education';
import { Scholarship } from './pages/scholarship';
import { Career } from './pages/career';
import { Library } from './pages/library';
import { GameStudio } from './pages/game-studio';

export const PAGE_STATES = {
  PORTFOLIO: '/portfolio',
  SERVICES: '/services',
  EDUCATION: '/education',
  SCHOLARSHIP: '/scholarship',
  CAREER: '/career',
  LIBRARY: '/library',
  GAME_STUDIO: '/game-studio'
};

export default function App() {
  const [keşifSkoru, setKeşifSkoru] = useState(0);
  const [currentPage, setCurrentPage] = useState<string>(PAGE_STATES.PORTFOLIO);
  const [isLoading, setIsLoading] = useState(true);

  // Keşif skoru ekleme fonksiyonu
  const addKeşifSkoru = (amount: number) => {
    setKeşifSkoru(prev => prev + amount);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // Loading screen'i 3 saniye sonra kapat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case PAGE_STATES.PORTFOLIO:
        return <Portfolio keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
      case PAGE_STATES.SERVICES:
        return <Services keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
      case PAGE_STATES.EDUCATION:
        return <Education keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
      case PAGE_STATES.SCHOLARSHIP:
        return <Scholarship keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
      case PAGE_STATES.CAREER:
        return <Career keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
      case PAGE_STATES.LIBRARY:
        return <Library keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
      case PAGE_STATES.GAME_STUDIO:
        return <GameStudio keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
      default:
        return <Portfolio keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation keşifSkoru={keşifSkoru} onPageChange={handlePageChange} />
      
      {isLoading ? (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#4efaa7] border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4efaa7] to-[#7ffbc4] opacity-20 blur-xl animate-pulse" />
          </div>
          <p className="mt-8 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#4efaa7] to-[#7ffbc4]">
            Bu sayfa yapay zeka desteğiyle geliştirilmiştir
          </p>
          <p className="mt-2 text-sm text-[#4efaa7]/80">
            Yükleniyor...
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      )}
    </div>
  );
}