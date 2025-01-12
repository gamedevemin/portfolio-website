import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#home', label: 'Ana Sayfa' },
    { href: '#about', label: 'Hakkımda' },
    { href: '#skills', label: 'Beceriler' },
    { href: '#projects', label: 'Projeler' },
    { href: '#experience', label: 'Deneyim' },
    { href: '#contact', label: 'İletişim' }
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg' : ''
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between md:justify-center">
          {/* Mobile menu button */}
          <button
            onClick={handleMenuClick}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu placeholder for flex alignment */}
          <div className="w-6 md:hidden"></div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800">
            <div className="flex flex-col space-y-2 px-4 py-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors py-2"
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