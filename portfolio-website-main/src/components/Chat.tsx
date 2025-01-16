import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { X, Send, Mail, Phone, ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  onFirstMessage?: () => void;
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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const inputStageVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: 0.2
    }
  }
};

const InputStage = ({ value, onChange, onSubmit, onBack, placeholder, icon, showBackButton }: InputStageProps) => (
  <motion.div
    variants={inputStageVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="flex gap-2"
  >
    {showBackButton && (
      <button
        onClick={onBack}
        className="p-2 rounded-xl bg-black text-gray-400 hover:text-white hover:bg-black/70 transition-colors border border-[#4efaa7]/20"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
    )}
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-black text-white placeholder-gray-500 border border-[#4efaa7]/20 focus:border-[#4efaa7]/40 focus:outline-none transition-all duration-300"
        onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
      />
    </div>
    <button
      onClick={onSubmit}
      className="p-3 rounded-xl bg-black text-[#4efaa7] hover:text-white border border-[#4efaa7]/20 transition-all duration-300"
    >
      <Send className="w-5 h-5" />
    </button>
  </motion.div>
);

export function Chat({ isOpen, onClose, onFirstMessage }: ChatProps) {
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [stage, setStage] = useState<'message' | 'contact'>('message');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateContact = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleMessageSubmit = () => {
    if (!message.trim()) {
      setError('Lütfen bir mesaj girin.');
      return;
    }
    setError(null);
    setStage('contact');
  };

  const handleContactSubmit = async () => {
    if (!validateContact(contact)) {
      setError('Lütfen geçerli bir e-posta adresi veya telefon numarası girin.');
      return;
    }

    setIsSending(true);
    setError(null);

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
      if (!hasShownConfetti) {
        onFirstMessage?.();
        setHasShownConfetti(true);
      }

      // Reset after 2 seconds
      setTimeout(() => {
        setMessage('');
        setContact('');
        setStage('message');
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Email sending error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleBack = () => {
    setStage('message');
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="lg:hidden">
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-black p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-[#4efaa7]/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Mesaj Gönder
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white p-1 hover:bg-black/70 rounded-full transition-colors border border-[#4efaa7]/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-5">
                <AnimatePresence mode="wait">
                  {stage === 'message' && (
                    <InputStage
                      key="message"
                      value={message}
                      onChange={setMessage}
                      onSubmit={handleMessageSubmit}
                      placeholder="Mesajınız..."
                      icon={<Send className="w-5 h-5 text-[#4efaa7]" />}
                    />
                  )}

                  {stage === 'contact' && (
                    <InputStage
                      key="contact"
                      value={contact}
                      onChange={setContact}
                      onSubmit={handleContactSubmit}
                      onBack={handleBack}
                      placeholder="E-posta veya telefon numarası"
                      icon={<Mail className="w-5 h-5 text-[#4efaa7]" />}
                      showBackButton
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm bg-black px-4 py-2 rounded-lg border border-red-500/20"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 text-[#4efaa7]"
                  >
                    <Check className="w-5 h-5" />
                    <span>Mesajınız gönderildi!</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 