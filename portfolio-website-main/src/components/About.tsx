import { useState } from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  addKeşifSkoru: (amount: number) => void;
}

interface EducationDetails {
  university: string;
  department: string;
  gpa: string;
  graduationYear: string;
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

interface Publication {
  title: string;
  platform: string;
  date: string;
}

interface Achievement {
  id: string;
  title: string;
  kesifSkoru: number;
  details?: EducationDetails;
  certificates?: Certificate[];
  publications?: Publication[];
}

export function About({ addKeşifSkoru }: AboutProps) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const achievements: Achievement[] = [
    {
      id: 'education',
      title: 'Eğitim',
      kesifSkoru: 20,
      details: {
        university: 'Kırklareli Üniversitesi',
        department: 'Lüleburgaz MYO - Bilgisayar Programcılığı',
        gpa: '1.60/4.00',
        graduationYear: '2024'
      }
    },
    {
      id: 'events',
      title: 'Etkinlikler',
      kesifSkoru: 15,
      certificates: [
        {
          name: 'İzmir DevFest\'24',
          issuer: 'Google Developer Groups',
          date: '2024'
        },
        {
          name: 'TakeOff İstanbul\'24',
          issuer: 'T3 Girişim Merkezi',
          date: '2024'
        }
      ]
    },
    {
      id: 'volunteer',
      title: 'Gönüllülük',
      kesifSkoru: 15,
      publications: [
        {
          title: 'Gamfed Türkiye',
          platform: 'Topluluk Üyesi',
          date: '2024'
        },
        {
          title: 'Peregrine Oyun Stüdyosu',
          platform: 'Blueprint Geliştiricisi',
          date: '2024'
        }
      ]
    },
    {
      id: 'hobbies',
      title: 'Hobiler',
      kesifSkoru: 10,
      publications: [
        {
          title: 'Aktif Yaşam',
          platform: 'Doğa Sporları, Sağlıklı Yaşam',
          date: ''
        },
        {
          title: 'Kişisel Gelişim',
          platform: 'Üretkenlik, Verimlilik, Kitap Okuma',
          date: ''
        },
        {
          title: 'Sosyal & Eğlence',
          platform: 'Aile Sohbetleri, Oyun, Müzik',
          date: ''
        }
      ]
    }
  ];

  const unlockAchievement = (id: string, kesifSkoru: number) => {
    if (!unlockedAchievements.includes(id)) {
      setUnlockedAchievements([...unlockedAchievements, id]);
      addKeşifSkoru(kesifSkoru);
    }
    
    // Toggle selected card
    if (selectedCard === id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(id);
    }
  };

  const renderDetails = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'education':
        return achievement.details && (
          <div className="text-base sm:text-sm text-gray-400">
            <p className="text-xl sm:text-lg font-semibold mb-3">{achievement.details.university}</p>
            <p className="text-base sm:text-sm mb-1">{achievement.details.department}</p>
            <p className="text-base sm:text-sm mb-1">GPA: {achievement.details.gpa}</p>
            <p className="text-base sm:text-sm">Mezuniyet: {achievement.details.graduationYear}</p>
          </div>
        );
      case 'events':
        return achievement.certificates && (
          <div className="text-base sm:text-sm text-gray-400">
            <p className="text-xl sm:text-lg font-semibold mb-4">Katıldığım Etkinlikler</p>
            {achievement.certificates.map((cert, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg sm:text-base font-semibold mb-1">{cert.name}</p>
                <p className="text-base sm:text-sm">{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        );
      case 'volunteer':
      case 'hobbies':
        return achievement.publications && (
          <div className="text-base sm:text-sm text-gray-400">
            <p className="text-xl sm:text-lg font-semibold mb-4">
              {achievement.id === 'volunteer' ? 'Gönüllü Faaliyetlerim' : 'Hobilerim ve İlgi Alanlarım'}
            </p>
            {achievement.publications.map((pub, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg sm:text-base font-semibold mb-1">{pub.title}</p>
                <p className="text-base sm:text-sm">{pub.platform}</p>
                {pub.date && <p className="text-base sm:text-sm">{pub.date}</p>}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="pt-0 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Journey Section */}
        <div className="p-6 bg-black border border-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            🚀 Programcılık & Girişimcilik Yolculuğu
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Yazılım geliştirme ve girişimcilik tutkusuyla çıktığım yolculukta, bir yandan KOBİ'lere özel yazılım çözümleri üreterek iş dünyası deneyimi kazanırken, diğer yandan Unreal Engine ve C++ ile AAA kalitesinde oyunlar geliştirmeyi hedefliyorum. Yapay zeka teknolojilerini hem işletme çözümlerine hem de oyun geliştirme süreçlerine entegre ederek yenilikçi projeler üretiyorum.
          </p>

          <div className="space-y-4 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <span>🎮</span>
              <span>Oyun Geliştirme: Unreal Engine, C++, Blueprint</span>
            </p>
            <p className="flex items-center gap-2">
              <span>💼</span>
              <span>İş Çözümleri: KOBİ'lere Özel Yazılım, İş Süreç Otomasyonu</span>
            </p>
            <p className="flex items-center gap-2">
              <span>🤖</span>
              <span>Teknoloji Entegrasyonu: Yapay Zeka, Süreç Optimizasyonu</span>
            </p>
            <p className="flex items-center gap-2">
              <span>🚀</span>
              <span>Hedef: AAA Oyun Stüdyosu & Teknoloji Girişimi</span>
            </p>
          </div>
        </div>

        {/* Achievement Cards Section */}
        <div className="space-y-6">
          {/* Achievement Cards Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id}>
                <div
                  onClick={() => unlockAchievement(achievement.id, achievement.kesifSkoru)}
                  className={`p-2 sm:p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 h-full flex flex-col justify-center items-center ${
                    unlockedAchievements.includes(achievement.id)
                      ? 'bg-black border border-gray-800 hover:border-gray-700'
                      : 'bg-black border border-gray-900 hover:border-gray-800'
                  }`}
                >
                  <h3 className="text-xs sm:text-lg font-semibold text-white text-center mb-1 sm:mb-2">{achievement.title}</h3>
                  {!unlockedAchievements.includes(achievement.id) && (
                    <div className="text-[10px] sm:text-base text-[#4efaa7] text-center animate-pulse">+{achievement.kesifSkoru}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Details Section - In Flow */}
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full p-3 sm:p-6 bg-black border border-gray-800 rounded-lg shadow-xl"
            >
              {renderDetails(achievements.find(a => a.id === selectedCard)!)}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}