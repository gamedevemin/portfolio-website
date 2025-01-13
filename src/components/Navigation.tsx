import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { Flame, ChevronDown } from 'lucide-react';

interface NavigationProps {
  keşifSkoru: number;
  onPageChange: (page: string) => void;
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

// Konfeti ayarları
const CONFETTI_CONFIG = {
  recycle: false,
  numberOfPieces: 500,
  gravity: 0.3,
  friction: 0.99,
  wind: 0.01,
  ticks: 500,
  spread: 180,
  startVelocity: 50,
  scalar: 1.2,
  colors: ['#FFD700', '#FFA500', '#FFFF00', '#F59E0B', '#FBBF24'],
  shapes: ['circle'],
  dragFriction: 0.12,
  stagger: 5,
  shapeSize: 1
};

export function Navigation({ keşifSkoru, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFlameAnimating, setIsFlameAnimating] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('/portfolio');
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastCelebrated, setLastCelebrated] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Pencere boyutunu takip et
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Konfeti efektini kontrol et
  useEffect(() => {
    console.log('Keşif Skoru Değişti:', keşifSkoru);
    console.log('Son Kutlanan:', lastCelebrated);
    console.log('Konfeti Durumu:', showConfetti);
    console.log('Mod 100:', keşifSkoru % 100);

    const shouldShowConfetti = keşifSkoru % 100 === 0 && keşifSkoru > 0 && keşifSkoru !== lastCelebrated;
    console.log('Konfeti Gösterilmeli mi?', shouldShowConfetti);

    if (shouldShowConfetti) {
      console.log('Konfeti Tetikleniyor!');
      setShowConfetti(true);
      setIsFlameAnimating(true);
      setLastCelebrated(keşifSkoru);

      // Alev animasyonunu kapat
      setTimeout(() => {
        setIsFlameAnimating(false);
      }, 500);

      // Konfeti animasyonunu kapat
      setTimeout(() => {
        console.log('Konfeti Kapatılıyor');
        setShowConfetti(false);
      }, 5000);
    }
  }, [keşifSkoru]);

  // Menü öğesine tıklama işleyicisi
  const handleMenuClick = (href: string) => {
    setActiveMenuItem(href);
    onPageChange(href);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0" style={{ zIndex: 999999, pointerEvents: 'none' }}>
          <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            {...CONFETTI_CONFIG}
            recycle={false}
            run={true}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      )}
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
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
                  <div className="absolute top-full right-0 mt-1 w-48 bg-gray-900 rounded-lg shadow-lg py-1 z-50">
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
            </div>

            {/* Keşif Skoru Counter */}
            <div className="flex items-center">
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


