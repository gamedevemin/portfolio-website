import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  onFirstMessage?: () => void;
}

export function Chat({ isOpen, onClose, onFirstMessage }: ChatProps) {
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const validateContact = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSendMessage = async () => {
    if (!validateContact(contact)) {
      setError('Lütfen geçerli bir e-posta adresi veya telefon numarası girin.');
      return;
    }

    if (!message.trim()) {
      setError('Lütfen bir mesaj girin.');
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

      setMessage('');
      if (!hasShownConfetti) {
        onFirstMessage?.();
        setHasShownConfetti(true);
      }
    } catch (err) {
      setError('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Email sending error:', err);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Mesaj Gönder</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="E-posta veya telefon numarası"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesajınız..."
              rows={4}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            onClick={handleSendMessage}
            disabled={isSending}
            className={`w-full py-2 px-4 rounded ${
              isSending 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600'
            } text-white font-medium transition-colors`}
          >
            {isSending ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </div>
  );
} 