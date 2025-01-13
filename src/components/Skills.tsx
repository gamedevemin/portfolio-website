import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Code2, GraduationCap, Users } from 'lucide-react';

interface SkillsProps {
  addKeşifSkoru: (amount: number) => void;
}

interface Notification {
  id: number;
  message: string;
}

interface SkillCategory {
  icon: JSX.Element;
  title: string;
  skills: Array<{
    name: string;
    level: number | string;
  }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const skillVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const notificationVariants = {
  initial: { opacity: 0, y: 50, x: '-50%' },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

export function Skills({ addKeşifSkoru }: SkillsProps) {
  const [unlockedSkills, setUnlockedSkills] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skills: Record<string, SkillCategory> = {
    gamedev: {
      icon: <Gamepad2 className="w-5 h-5 text-gray-200" />,
      title: 'Oyun Geliştirme',
      skills: [
        { name: 'Unreal Engine', level: 10 },
        { name: 'Blueprint Visual Scripting', level: 20 },
        { name: 'C++', level: 20 },
        { name: 'Oyun Tasarımı', level: 20 },
        { name: 'Oyunlaştırma', level: 25 }
      ]
    },
    programming: {
      icon: <Code2 className="w-5 h-5 text-gray-200" />,
      title: 'Yazılım Prensipleri',
      skills: [
        { name: 'Nesne Yönelimli Programlama', level: 60 },
        { name: 'SOLID Prensipleri', level: 20 },
        { name: 'Temiz Kod Yazımı', level: 20 },
        { name: 'Veri Yapıları & Algoritmalar', level: 20 }
      ]
    },
    core: {
      icon: <GraduationCap className="w-5 h-5 text-gray-200" />,
      title: 'Temel Gereksinimler',
      skills: [
        { name: 'İngilizce', level: 'A2' },
        { name: 'Matematik & Algoritma', level: 20 },
        { name: 'Araştırma & Öğrenme', level: 70 },
        { name: 'Problem Analizi', level: 55 },
        { name: 'Prompt Mühendisliği', level: 65 }
      ]
    },
    softSkills: {
      icon: <Users className="w-5 h-5 text-gray-200" />,
      title: 'Kişisel Beceriler',
      skills: [
        { name: 'Problem Çözme', level: 90 },
        { name: 'Analitik Düşünme', level: 20 },
        { name: 'Takım Çalışması', level: 60 },
        { name: 'İletişim', level: 60 },
        { name: 'Zaman Yönetimi', level: 20 },
        { name: 'Adaptasyon', level: 70 }
      ]
    }
  };

  const handleSkillClick = (skillName: string) => {
    if (activeSkill === skillName) {
      setActiveSkill(null);
      return;
    }

    setActiveSkill(skillName);
    
    if (!unlockedSkills.has(skillName)) {
      const newUnlockedSkills = new Set(unlockedSkills);
      newUnlockedSkills.add(skillName);
      setUnlockedSkills(newUnlockedSkills);
      addKeşifSkoru(15);
      
      const notification = {
        id: Date.now(),
        message: '+15 Keşif Skoru Kazanıldı!'
      };
      setNotifications(prev => [...prev, notification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000);
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-white"
        >
          Profesyonel Yetkinlikler
        </motion.h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {Object.entries(skills).map(([category, { icon, title, skills }]) => (
              <motion.div
                key={category}
                className={`p-3 sm:p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all ${
                  unlockedSkills.has(category)
                    ? 'bg-black border border-gray-800 text-white'
                    : 'bg-black border border-gray-900 text-gray-400'
                }`}
                onClick={() => handleSkillClick(category)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <h3 className="text-sm sm:text-lg font-semibold">{title}</h3>
                  </div>
                  {!unlockedSkills.has(category) && (
                    <div className="relative flex items-center justify-center w-6 h-6">
                      <motion.div 
                        className="text-[10px] font-semibold text-amber-400"
                        animate={{
                          scale: [0.95, 1.05, 0.95],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        +15
                      </motion.div>
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {activeSkill === category && (
                    <motion.div
                      variants={skillVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="mt-2 space-y-2"
                    >
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5 sm:space-y-2">
                          <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                            <span>{skill.name}</span>
                            <span>{typeof skill.level === 'number' ? `${skill.level}%` : skill.level}</span>
                          </div>
                          <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ 
                                width: typeof skill.level === 'number' ? `${skill.level}%` : '40%'
                              }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              variants={notificationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg z-50 backdrop-blur-sm"
            >
              {notification.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}