import { useState } from 'react';
import { Github, Linkedin, Mail, Gamepad2, Bot, Code2, Youtube } from 'lucide-react';

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
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f')] bg-center bg-cover bg-no-repeat"></div>
      </div>
      
      <div className="text-center relative w-full max-w-4xl mx-auto">
        <div 
          className="relative group cursor-pointer"
          onClick={handleAvatarClick}
        >
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6"
            alt="Profile"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 sm:mb-8 object-cover border-4 border-blue-500 transition-transform transform group-hover:scale-105"
          />
          {!clicked && (
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full animate-bounce">
              +10 XP
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 rounded-full text-white flex items-center gap-2 text-sm sm:text-base">
            <Gamepad2 size={16} className="sm:w-5 sm:h-5" />
            UE Oyun Geliştirici & Girişimcisi
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 rounded-full text-white flex items-center gap-2 text-sm sm:text-base">
            <Bot size={16} className="sm:w-5 sm:h-5" />
            Yazılım Çözümleri Uzmanı
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
          Muhammed Emin Çelenk
        </h1>
        <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 flex items-center justify-center gap-2">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
          Jr. Unreal Engine Geliştirici
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          Hem geliştirici hem girişimci kimliğiyle AAA kalitesinde dijital oyun stüdyosu hedefleyen tutkulu bir yazılımcı. KOBİ'lerin yazılım ihtiyaçlarına yönelik çözümler üreterek iş dünyası deneyimi kazanırken, Unreal Engine ve yapay zeka teknolojileriyle oyun geliştirme alanında da kendini geliştiriyor. Güçlü problem çözme, analitik düşünme ve takım yönetimi becerileriyle öne çıkan, yenilikçi ve sürdürülebilir çözümler üretmeye odaklı bir teknoloji girişimcisi.
        </p>
        <div className="flex justify-center gap-3 sm:gap-4">
          <a 
            href="https://github.com" 
            className="p-1.5 sm:p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transform hover:scale-110 transition-transform"
            onClick={() => addXP(5)}
          >
            <Github size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a 
            href="https://linkedin.com" 
            className="p-1.5 sm:p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transform hover:scale-110 transition-transform"
            onClick={() => addXP(5)}
          >
            <Linkedin size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a 
            href="https://youtube.com" 
            className="p-1.5 sm:p-2 rounded-full bg-red-600 text-white hover:bg-red-500 transform hover:scale-110 transition-transform"
            onClick={() => addXP(5)}
          >
            <Youtube size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a 
            href="mailto:email@example.com" 
            className="p-1.5 sm:p-2 rounded-full bg-red-600 text-white hover:bg-red-500 transform hover:scale-110 transition-transform"
            onClick={() => addXP(5)}
          >
            <Mail size={20} className="sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}