import { useState, useEffect } from 'react';
import { ChevronDown, MessageCircle, Medal, Send, Check, ArrowLeft, Lock } from 'lucide-react';
import { Chat } from './Chat';
import { Z_INDEX } from '../styles/z-index';
import { Confetti } from './Confetti';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { PAGE_STATES } from '../App';
import React from 'react';

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
  underConstruction: boolean;
}

interface InputStageProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack?: () => void;
  placeholder: string;
  icon: JSX.Element;
  showBackButton?: boolean;
}

// Ana menü öğeleri
const MAIN_MENU_ITEMS: MenuItem[] = [
  { href: '/portfolio', label: 'Portfolyo', isActive: true }
];

// Dropdown menü öğeleri
const DROPDOWN_ITEMS: DropdownItem[] = [
  { href: 'career', label: 'Karbon Solutions', underConstruction: false }
];

const MILESTONES = Array.from({ length: 13 }, (_, i) => (i + 1) * 100);

const getIntensityForScore = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 1000) return 'high';
  if (score >= 500) return 'medium';
  return 'low';
};

const InputStage = ({ value, onChange, onSubmit, onBack, placeholder, icon, showBackButton }: InputStageProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ type: "spring", duration: 0.3 }}
    className="flex gap-2"
  >
    {showBackButton && (
      <button
        onClick={onBack}
        className="p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
    )}
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700/50 focus:border-[#4efaa7] focus:outline-none transition-all duration-300 text-sm"
        onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
      />
    </div>
    <button
      onClick={onSubmit}
      className="p-2 rounded-lg bg-gradient-to-r from-[#4efaa7] to-[#7ffbc4] hover:from-[#3ef596] hover:to-[#6efab3] text-gray-900 transition-all duration-300"
    >
      <Send className="w-4 h-4" />
    </button>
  </motion.div>
);

// Memoized components for better performance
const MemoizedChatButton = React.memo(({ onClick, isChatOpen }: { onClick: () => void, isChatOpen: boolean }) => (
  <button
    onClick={onClick}
    className="relative overflow-hidden bg-gray-800/90 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700/90 transition-all duration-300 group border border-gray-700/50 hover:border-gray-600/50"
  >
    <MessageCircle className="w-4 h-4 text-[#4efaa7] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
  </button>
));

const MemoizedScoreDisplay = React.memo(({ score, isAnimating, hasShown }: { score: number, isAnimating: boolean, hasShown: boolean }) => (
  <div className={`keşif-skoru-button bg-black/90 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs border border-[#4efaa7]/20 hover:border-[#4efaa7]/30 ${!hasShown ? 'opacity-0' : 'animate-score-reveal'}`}>
    <Medal 
      className={`w-3.5 h-3.5 text-[#4efaa7] transition-all duration-300 ${isAnimating ? 'animate-coin-pulse scale-125' : ''}`} 
    />
    <span>{score}</span>
  </div>
));

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
  const [hasShownScore, setHasShownScore] = useState(false);
  const [stage, setStage] = useState('message');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConstructionNotice, setShowConstructionNotice] = useState(false);

  // Utility function to trigger celebration
  const triggerCelebration = () => {
    setShowConfetti(false);
    // Kısa bir gecikme ile konfeti gösterimi
    setTimeout(() => {
      setShowConfetti(true);
      setIsFlameAnimating(true);
      
      // Konfeti ve alev animasyonunu kapat
      setTimeout(() => {
        setShowConfetti(false);
        setIsFlameAnimating(false);
      }, 4000);
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

  // Handle dropdown item click
  const handleDropdownItemClick = (href: string) => {
    const item = DROPDOWN_ITEMS.find(item => item.href === href);
    if (item?.underConstruction) {
      return;
    }
    setActiveMenuItem(href);
    onPageChange(href);
    setIsDropdownOpen(false);
  };

  // Handle menu click
  const handleMenuClick = (href: string) => {
    const item = DROPDOWN_ITEMS.find(item => item.href === href);
    if (item?.underConstruction) {
      return;
    }

    if (!hasUsedHamburger && isMenuOpen) {
      triggerCelebration();
      setHasUsedHamburger(true);
    }
    
    setActiveMenuItem(href);
    onPageChange(href.startsWith('/') ? href : `/${href}`);
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

  useEffect(() => {
    if (isFlameAnimating && !hasShownScore) {
      setHasShownScore(true);
    }
  }, [isFlameAnimating]);

  const handleMessageSubmit = () => {
    if (!message.trim()) {
      setError('Lütfen bir mesaj girin.');
      // 3 saniye sonra hata mesajını kaldır
      setTimeout(() => setError(''), 3000);
      return;
    }
    setError('');
    setStage('contact');
  };

  const validateContact = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleContactSubmit = async () => {
    if (!validateContact(contact)) {
      setError('Lütfen geçerli bir e-posta adresi veya telefon numarası girin.');
      // 3 saniye sonra hata mesajını kaldır
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await emailjs.send(
        'service_yrqretk',
        'template_64g79ys',
        {
          from_name: contact,
          message: message,
          contact_info: contact,
          timestamp: new Date().toLocaleString()
        },
        '-D7fEyeF_sqM_Zzom'
      );

      setIsSuccess(true);
      if (!hasShownFirstChat) {
        handleChatCelebration();
      }

      // Reset after 2 seconds
      setTimeout(() => {
        setMessage('');
        setContact('');
        setStage('message');
        setIsSuccess(false);
        setIsChatOpen(false);
      }, 2000);
    } catch (err) {
      setError('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      // 3 saniye sonra hata mesajını kaldır
      setTimeout(() => setError(''), 3000);
      console.error('Email sending error:', err);
    }
  };

  const handleBack = () => {
    setStage('message');
    setError('');
  };

  const handlePageChange = (page: string) => {
    onPageChange(page);
  };

  return (
    <>
      {/* Construction Notice */}
      <AnimatePresence>
        {showConstructionNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-900/90 backdrop-blur-sm text-[#4efaa7] px-6 py-3 rounded-lg border border-[#4efaa7]/20 shadow-lg shadow-black/50 flex items-center gap-3">
              <Construction className="w-5 h-5" />
              <span>Bu sayfa yapım aşamasındadır</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: Z_INDEX.MAXIMUM }}>
        <Confetti 
          isActive={showConfetti} 
          intensity={getIntensityForScore(keşifSkoru)}
          duration={4000}
        />
      </div>
      
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
            <div className="hidden lg:flex lg:items-center lg:flex-1">
              <div className="flex items-center space-x-1">
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
                          className={`w-full text-left px-4 py-2 text-sm ${item.underConstruction ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-gray-800'} flex items-center justify-between`}
                          disabled={item.underConstruction}
                        >
                          <span>{item.label}</span>
                          {item.underConstruction && <Lock className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Chat Button - Desktop */}
                <div className="relative">
                  <MemoizedChatButton onClick={() => setIsChatOpen(!isChatOpen)} isChatOpen={isChatOpen} />

                  {/* Desktop Chat Panel */}
                  <AnimatePresence>
                    {isChatOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="absolute top-0 left-full ml-2 flex items-center gap-2"
                        style={{ zIndex: Z_INDEX.NAVBAR_DROPDOWN }}
                      >
                        <AnimatePresence mode="wait">
                          {stage === 'message' && (
                            <div className="flex items-center gap-2">
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="relative"
                              >
                                <input
                                  type="text"
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  placeholder="Mesajınız..."
                                  className="w-48 pl-3 pr-3 py-1.5 rounded-lg bg-gray-800/90 text-white placeholder-gray-500 border border-gray-700/50 focus:border-[#4efaa7] focus:outline-none transition-all duration-300 text-sm"
                                  onKeyPress={(e) => e.key === 'Enter' && handleMessageSubmit()}
                                />
                              </motion.div>
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleMessageSubmit}
                                className="p-1.5 rounded-lg bg-gradient-to-r from-[#4efaa7] to-[#7ffbc4] hover:from-[#3ef596] hover:to-[#6efab3] text-gray-900 transition-all duration-300"
                              >
                                <Send className="w-4 h-4" />
                              </motion.button>
                            </div>
                          )}

                          {stage === 'contact' && (
                            <div className="flex items-center gap-2">
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleBack}
                                className="p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                              >
                                <ArrowLeft className="w-4 h-4" />
                              </motion.button>
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="relative"
                              >
                                <input
                                  type="text"
                                  value={contact}
                                  onChange={(e) => setContact(e.target.value)}
                                  placeholder="E-posta veya telefon"
                                  className="w-48 pl-3 pr-3 py-1.5 rounded-lg bg-gray-800/90 text-white placeholder-gray-500 border border-gray-700/50 focus:border-[#4efaa7] focus:outline-none transition-all duration-300 text-sm"
                                  onKeyPress={(e) => e.key === 'Enter' && handleContactSubmit()}
                                />
                              </motion.div>
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleContactSubmit}
                                className="p-1.5 rounded-lg bg-gradient-to-r from-[#4efaa7] to-[#7ffbc4] hover:from-[#3ef596] hover:to-[#6efab3] text-gray-900 transition-all duration-300"
                              >
                                <Send className="w-4 h-4" />
                              </motion.button>
                            </div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute -bottom-8 left-0 right-0 text-red-400 text-xs bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20 whitespace-nowrap"
                            >
                              {error}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {isSuccess && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-1 text-[#4efaa7] text-xs whitespace-nowrap"
                          >
                            <Check className="w-3 h-3" />
                            <span>Gönderildi!</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Side Items */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Keşif Skoru Counter - Desktop */}
                <MemoizedScoreDisplay score={keşifSkoru} isAnimating={isFlameAnimating} hasShown={hasShownScore} />
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
                <div className="border-t border-[#4efaa7]/10 mt-2 pt-2">
                  {DROPDOWN_ITEMS.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleMenuClick(item.href)}
                      className={`text-gray-300 block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between ${item.underConstruction ? 'text-gray-500 cursor-not-allowed' : 'hover:text-white'}`}
                      disabled={item.underConstruction}
                    >
                      <span>{item.label}</span>
                      {item.underConstruction && <Lock className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-[#4efaa7]/10" style={{ zIndex: Z_INDEX.NAVBAR }}>
        <div className="flex items-center justify-between px-4 h-full">
          {/* Left - Chat Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="relative overflow-hidden bg-black/90 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 group border border-white/20 hover:border-white/30"
            >
              <MessageCircle className="w-4 h-4 text-white transition-all duration-300 group-hover:scale-110" />
            </button>
          </div>

          {/* Center - Keşif Skoru */}
          <div className="flex items-center">
            <div className={`keşif-skoru-button bg-black/90 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs border border-[#4efaa7]/20 hover:border-[#4efaa7]/30 ${!hasShownScore ? 'opacity-0' : 'animate-score-reveal'}`}>
              <Medal 
                className={`w-3.5 h-3.5 text-[#4efaa7] transition-all duration-300 ${isFlameAnimating ? 'animate-coin-pulse scale-125' : ''}`} 
              />
              <span>{keşifSkoru}</span>
            </div>
          </div>

          {/* Right - Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg transition-colors duration-200 border border-white/20 hover:border-white/30"
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 left-0 w-full bg-black border-b border-[#4efaa7]/10"
            >
              <div className="p-4 space-y-2">
                {MAIN_MENU_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className={`text-gray-300 hover:text-white block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeMenuItem === item.href ? 'bg-black/50 text-white border border-[#4efaa7]/20' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Dropdown Items */}
                <div className="border-t border-[#4efaa7]/10 mt-2 pt-2">
                  {DROPDOWN_ITEMS.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleMenuClick(item.href)}
                      className={`text-gray-300 block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between ${item.underConstruction ? 'text-gray-500 cursor-not-allowed' : 'hover:text-white'}`}
                      disabled={item.underConstruction}
                    >
                      <span>{item.label}</span>
                      {item.underConstruction && <Lock className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}