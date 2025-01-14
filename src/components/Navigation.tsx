import { useState, useEffect } from 'react';
import { Flame, ChevronDown, MessageCircle } from 'lucide-react';
import { Chat } from './Chat';
import { Z_INDEX } from '../styles/z-index';
import { Confetti } from './Confetti';

interface NavigationProps {
  keşifSkoru: number;
  onPageChange: (page: string) => void;
  onProjectClick?: (projectId: string) => void;
}

interface MenuItem {
  href: string;
  label: string;
  isActive: boolean;
}

interface DropdownItem {
  href: string;
  label: string;
  icon?: JSX.Element;
}

// Ana menü öğeleri
const MAIN_MENU_ITEMS: MenuItem[] = [
  { href: '/portfolio', label: 'Portfolyo', isActive: true },
  { href: '/services', label: 'Hizmetler', isActive: false }
];

// Dropdown menü öğeleri
const DROPDOWN_ITEMS: DropdownItem[] = [
  { href: '/education', label: 'Eğitim' },
  { href: '/scholarship', label: 'Burs' },
  { href: '/career', label: 'Kariyer' },
  { href: '/library', label: 'Kütüphanem' },
  { href: '/game-studio', label: 'Oyun Stüdyosu', icon: <Flame className="w-4 h-4 text-amber-500" /> },
];

const MILESTONES = Array.from({ length: 13 }, (_, i) => (i + 1) * 100);

const getIntensityForScore = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 1000) return 'high';
  if (score >= 500) return 'medium';
  return 'low';
};

export function Navigation({ keşifSkoru, onPageChange, onProjectClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFlameAnimating, setIsFlameAnimating] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('/portfolio');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastCelebrated, setLastCelebrated] = useState<number | null>(null);
  const [hasShownFirstChat, setHasShownFirstChat] = useState(false);
  const [hasUsedHamburger, setHasUsedHamburger] = useState(false);
  const [celebrationId, setCelebrationId] = useState(0);

  // Utility function to trigger celebration
  const triggerCelebration = () => {
    setShowConfetti(false); // Reset first
    setTimeout(() => {
      setShowConfetti(true);
      setIsFlameAnimating(true);
      setCelebrationId(prev => prev + 1);
      
      setTimeout(() => {
        setShowConfetti(false);
        setIsFlameAnimating(false);
      }, 3000);
    }, 50);
  };

  // Check for first 20 points and subsequent celebrations
  useEffect(() => {
    if (keşifSkoru >= 20) {
      const shouldCelebrate = lastCelebrated === null || keşifSkoru - lastCelebrated >= 20;
      
      if (shouldCelebrate) {
        triggerCelebration();
        setLastCelebrated(keşifSkoru);
      }
    }
  }, [keşifSkoru, lastCelebrated]);

  // Handle hamburger menu navigation
  const handleMenuClick = (href: string) => {
    if (!hasUsedHamburger && isMenuOpen) {
      triggerCelebration();
      setHasUsedHamburger(true);
    }
    
    setActiveMenuItem(href);
    onPageChange(href);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Handle chat celebration
  const handleChatCelebration = () => {
    if (!hasShownFirstChat) {
      triggerCelebration();
      setHasShownFirstChat(true);
    }
  };

  // Handle project click celebration
  const handleProjectClick = (projectId: string) => {
    triggerCelebration();
    onProjectClick?.(projectId);
  };

  return (
    <>
      <Confetti 
        key={celebrationId}
        isActive={showConfetti} 
        intensity={getIntensityForScore(keşifSkoru)}
      />
      
      <Chat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        onFirstMessage={handleChatCelebration}
      />
      
      <nav className="fixed top-0 left-0 right-0" style={{ zIndex: Z_INDEX.NAVBAR }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobil menü butonu */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {MAIN_MENU_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeMenuItem === item.href ? 'bg-gray-900 text-white' : ''}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Daha Fazla Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1`}
                >
                  Daha Fazla
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-gray-900 rounded-lg shadow-lg py-1" style={{ zIndex: Z_INDEX.NAVBAR_DROPDOWN }}>
                    {DROPDOWN_ITEMS.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleMenuClick(item.href)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2"
                      >
                        {item.label}
                        {item.icon && item.icon}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Button - Desktop */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 group"
              >
                <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                <span className="group-hover:text-white">Sohbet</span>
              </button>
            </div>

            {/* Keşif Skoru Counter - Desktop */}
            <div className="hidden lg:flex items-center">
              <div className="keşif-skoru-button bg-gray-800/90 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:bg-gray-700/90 transition-all duration-300 relative overflow-hidden group">
                <Flame 
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 transition-all duration-300 ${isFlameAnimating ? 'animate-flame-pulse scale-125' : ''} group-hover:scale-110 group-hover:rotate-12`} 
                />
                <span className="hidden sm:inline">Keşif Skoru:</span>
                <span>{keşifSkoru}</span>
                {isFlameAnimating && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/20 animate-gradient" />
                )}
              </div>
            </div>

            {/* Keşif Skoru Counter ve Chat Button - Mobile */}
            <div className="lg:hidden flex items-center justify-end space-x-2 flex-1">
              <div className="flex-1 flex justify-center">
                <div className="keşif-skoru-button bg-gray-800/90 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs hover:bg-gray-700/90 transition-all duration-300 relative overflow-hidden group">
                  <Flame 
                    className={`w-3.5 h-3.5 text-amber-500 transition-all duration-300 ${isFlameAnimating ? 'animate-flame-pulse scale-125' : ''} group-hover:scale-110 group-hover:rotate-12`} 
                  />
                  <span>{keşifSkoru}</span>
                  {isFlameAnimating && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/20 animate-gradient" />
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center justify-center w-8 h-8 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-gray-300 rounded-full transition-all duration-200 border border-gray-800 hover:border-gray-700"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobil menü */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm rounded-lg mt-2">
              {MAIN_MENU_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className={`text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeMenuItem === item.href ? 'bg-gray-800 text-white' : ''}`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobil Dropdown Items */}
              <div className="border-t border-gray-700 mt-2 pt-2">
                {DROPDOWN_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.label}
                    {item.icon && item.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}


