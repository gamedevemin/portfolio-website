import { useState } from 'react';
import { Gamepad2, Code2, Bot, Brain, Target, Rocket } from 'lucide-react';

interface SkillsProps {
  addXP: (amount: number) => void;
}

export function Skills({ addXP }: SkillsProps) {
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>([]);

  const skills = {
    gamedev: {
      icon: Gamepad2,
      title: 'Oyun Geliştirme',
      skills: [
        { name: 'Unreal Engine', level: 10 },
        { name: 'Blueprint Visual Scripting', level: 20 },
        { name: 'C++', level: 20 },
        { name: 'Oyun Tasarımı', level: 40 }
      ]
    },
    ai: {
      icon: Bot,
      title: 'Yapay Zeka & Araçlar',
      skills: [
        { name: 'AI Ajanları', level: 60 },
        { name: 'Prompt Mühendisliği', level: 35 },
        { name: 'Makine Öğrenmesi', level: 3 },
        { name: 'Derin Öğrenme', level: 3 },
        { name: 'Doğal Dil İşleme', level: 3 }
      ]
    },
    programming: {
      icon: Code2,
      title: 'Yazılım Prensipleri',
      skills: [
        { name: 'Nesne Yönelimli Programlama', level: 60 },
        { name: 'SOLID Prensipleri', level: 20 },
        { name: 'Temiz Kod Yazımı', level: 20 },
        { name: 'Tasarım Desenleri', level: 20 },
        { name: 'Veri Yapıları & Algoritmalar', level: 20 },
        { name: 'Code Review', level: 12 }
      ]
    },
    entrepreneurship: {
      icon: Target,
      title: 'Girişimcilik',
      skills: [
        { name: 'İş Modeli Geliştirme', level: 15 },
        { name: 'Pazar Analizi', level: 15 },
        { name: 'Müşteri İlişkileri', level: 15 },
        { name: 'Proje Yönetimi', level: 15 },
        { name: 'Finansal Planlama', level: 15 },
        { name: 'Stratejik Düşünme', level: 15 }
      ]
    },
    core: {
      icon: Rocket,
      title: 'Temel Gereksinimler',
      skills: [
        { name: 'İngilizce', level: 'A2' },
        { name: 'Matematik & Algoritma', level: 20 },
        { name: 'Araştırma & Öğrenme', level: 70 },
        { name: 'Problem Analizi', level: 55 }
      ]
    },
    softSkills: {
      icon: Brain,
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
    if (!unlockedSkills.includes(skillName)) {
      setUnlockedSkills([...unlockedSkills, skillName]);
      addXP(15);
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/5 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800 dark:text-white">
          Yetenek Ağacı
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {Object.entries(skills).map(([category, { icon: Icon, title, skills }]) => (
            <div 
              key={category}
              className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleSkillClick(category)}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Icon size={20} className="sm:w-6 sm:h-6 text-blue-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                  {title}
                </h3>
                {!unlockedSkills.includes(category) && (
                  <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-1 rounded-full animate-pulse">
                    +15 XP
                  </span>
                )}
              </div>
              {unlockedSkills.includes(category) && (
                <div className="space-y-3 sm:space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5 sm:space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        <span>{skill.name}</span>
                        <span>{typeof skill.level === 'number' ? `${skill.level}%` : skill.level}</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: typeof skill.level === 'number' ? `${skill.level}%` : '40%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}