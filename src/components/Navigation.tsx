import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface NavigationProps {
  xp: number;
  addXP: (amount: number) => void;
}

export function Navigation({ xp, addXP }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiConfig, setConfettiConfig] = useState({ x: 0, y: 0 });
  const [prevXp, setPrevXp] = useState(xp);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (Math.floor(xp / 100) > Math.floor(prevXp / 100)) {
      const xpButton = document.querySelector('.xp-button');
      if (xpButton) {
        const rect = xpButton.getBoundingClientRect();
        setConfettiConfig({
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2
        });
        setShowConfetti(true);
      }
    }
    setPrevXp(xp);
  }, [xp, prevXp]);

  const menuItems = [
    { href: '#home', label: 'Ana Sayfa' },
    { href: '#about', label: 'Hakkımda' },
    { href: '#skills', label: 'Beceriler' },
    { href: '#projects', label: 'Projeler' },
    { href: '#experience', label: 'Deneyim' },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : ''
    }`}>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={100}
          gravity={0.3}
          initialVelocityY={20}
          tweenDuration={4000}
          colors={['#ffffff', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252']}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 100
          }}
          confettiSource={{
            x: confettiConfig.x,
            y: confettiConfig.y,
            w: 0,
            h: 0
          }}
          opacity={0.8}
          wind={0.01}
          friction={0.97}
          drawShape={ctx => {
            ctx.beginPath();
            for(let i = 0; i < 6; i++) {
              const angle = (Math.PI * 2 / 6) * i;
              const x = Math.cos(angle) * 5;
              const y = Math.sin(angle) * 5;
              if(i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
          }}
          onConfettiComplete={(confetti) => {
            setShowConfetti(false);
            confetti?.reset();
          }}
        />
      )}
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={handleMenuClick}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none text-2xl"
          >
            {isMenuOpen ? '❌' : '☰'}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* XP indicator */}
          <div className="flex items-center gap-4">
            <div 
              className="bg-gray-900 rounded-full px-4 py-2 text-gray-100 flex items-center gap-2 xp-button cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => addXP(25)}
            >
              <span className="text-xl text-yellow-500">🎉</span>
              <span>{xp} XP</span>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-black shadow-lg border-t border-gray-800">
            <div className="flex flex-col space-y-2 px-4 py-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors py-2"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}