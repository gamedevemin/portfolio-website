import { useState } from 'react';
import { Github, Linkedin, Mail, Gamepad2, Bot, Youtube } from 'lucide-react';

interface HeroProps {
  addXP: (amount: number) => void;
}

export function Hero({ addXP }: HeroProps) {
  const [clicked, setClicked] = useState(false);

  const handleAvatarClick = () => {
    if (!clicked) {
      addXP(10);
      setClicked(true);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="text-center relative w-full max-w-4xl mx-auto">
        <div 
          className="relative group cursor-pointer mb-8"
          onClick={handleAvatarClick}
        >
          <img
            src="/images/emin.png"
            alt="Profile"
            className="w-40 h-40 mx-auto rounded-full border-2 border-gray-600 object-cover"
          />
          {!clicked && (
            <div className="absolute -top-2 -right-2 bg-gray-200 text-gray-900 text-xs px-2 py-1 rounded-full animate-bounce">
              +10 XP
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 rounded-full text-gray-100 flex items-center gap-2 text-sm sm:text-base">
            <Gamepad2 size={16} className="sm:w-5 sm:h-5" />
            UE Oyun Geliştirici & Girişimcisi
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 rounded-full text-gray-100 flex items-center gap-2 text-sm sm:text-base">
            <Bot size={16} className="sm:w-5 sm:h-5" />
            Yazılım Çözümleri Uzmanı
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-100">
          Muhammed Emin Çelenk
        </h1>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-400">
          Jr. Unreal Engine Geliştirici
        </p>

        <div className="flex justify-center items-center gap-6">
          <a href="https://github.com" className="text-gray-400 hover:text-white">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://youtube.com" className="text-gray-400 hover:text-white">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="mt-8 flex justify-center items-center gap-8">
          {/* Unreal Engine */}
          <svg className="w-24 h-24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <linearGradient id="pVl6bdv8xR2_oynBRXpQLa" x1="32" x2="32" y1="6" y2="58" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
              <stop offset="0" stopColor="#1a6dff"/>
              <stop offset="1" stopColor="#c822ff"/>
            </linearGradient>
            <path fill="none" stroke="url(#pVl6bdv8xR2_oynBRXpQLa)" strokeMiterlimit="10" strokeWidth="2" d="M32 7A25 25 0 1 0 32 57A25 25 0 1 0 32 7Z"/>
            <linearGradient id="pVl6bdv8xR2_oynBRXpQLb" x1="31.03" x2="31.03" y1="16" y2="48" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
              <stop offset="0" stopColor="#6dc7ff"/>
              <stop offset="1" stopColor="#e6abff"/>
            </linearGradient>
            <path fill="url(#pVl6bdv8xR2_oynBRXpQLb)" d="M13.125,36c-0.961-7.967,8.851-17.938,17.349-20c0,0-3.474,2.449-3.474,4.525 c0,4.154,1.971,2.745,1.971,2.745s0.039,14.986,0.039,16.057c0,1.071,0.985,1.673,2.365,1.673C32.755,41,36,39.25,36,39.25 s0-11.903,0-13.375s-1.644-2.822-2.438-3.515c2.123,0,3.088,0.737,3.088,0.737s2.756-3.643,9.919-5.557 C45.481,18.951,42,23.227,42,24.5s0,13.763,0,14.5s0.849,1,1.375,1c0.526,0,2.904-0.691,5.625-3.75c0,0.93-3.632,7.118-9.131,10.746 L36.25,44l-3.739,4c0,0-9.261-0.5-12.511-6c0.967,0.146,3,0.54,3-1s0-11.495,0-12.5S22.479,27,21.625,27 C20.771,27.001,17.747,27.685,13.125,36z"/>
          </svg>

          {/* C++ */}
          <svg className="w-24 h-24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <linearGradient id="Ey3AfYdg0JtJGx7I73Eu7a" x1="5" x2="43" y1="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset=".002" stopColor="#427fdb"/>
              <stop offset=".397" stopColor="#2668cb"/>
              <stop offset=".763" stopColor="#1358bf"/>
              <stop offset="1" stopColor="#0c52bb"/>
            </linearGradient>
            <path fill="url(#Ey3AfYdg0JtJGx7I73Eu7a)" fillRule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clipRule="evenodd"/>
            <linearGradient id="Ey3AfYdg0JtJGx7I73Eu7b" x1="5" x2="42.487" y1="18.702" y2="18.702" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#32bdef"/>
              <stop offset="1" stopColor="#1ea2e4"/>
            </linearGradient>
            <path fill="url(#Ey3AfYdg0JtJGx7I73Eu7b)" fillRule="evenodd" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836 c3.343-1.872,13.405-7.507,16.748-9.38c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331 c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z" clipRule="evenodd"/>
            <path fill="#fff" fillRule="evenodd" d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z" clipRule="evenodd"/>
            <linearGradient id="Ey3AfYdg0JtJGx7I73Eu7c" x1="23.593" x2="43" y1="23.852" y2="23.852" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2aa4f4"/>
              <stop offset="1" stopColor="#007ad9"/>
            </linearGradient>
            <path fill="url(#Ey3AfYdg0JtJGx7I73Eu7c)" fillRule="evenodd" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127 L23.593,24L42.485,13.205z" clipRule="evenodd"/>
            <polygon fill="#fff" points="33,21 31,21 31,23 29,23 29,25 31,25 31,27 33,27 33,25 35,25 35,23 33,23"/>
            <polygon fill="#fff" points="42,23 40,23 40,21 38,21 38,23 36,23 36,25 38,25 38,27 40,27 40,25 42,25"/>
          </svg>

          {/* Python */}
          <img src="/images/icons8-python.svg" alt="Python" className="w-24 h-24" />
        </div>
      </div>
    </section>
  );
}