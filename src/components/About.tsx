import { useState } from 'react';
import { Book, Award, Star, Rocket, Target } from 'lucide-react';

interface AboutProps {
  addXP: (amount: number) => void;
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
  icon: any;
  title: string;
  description: string;
  xp: number;
  details?: {
    university: string;
    department: string;
    gpa: string;
    graduationYear: string;
  };
  certificates?: Certificate[];
  publications?: Publication[];
}

export function About({ addXP }: AboutProps) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const achievements: Achievement[] = [
    {
      id: 'education',
      icon: Book,
      title: 'Eğitim',
      description: 'Bilgisayar Programcılığı Önlisans Mezunu',
      xp: 20,
      details: {
        university: 'Kırklareli Üniversitesi',
        department: 'Lüleburgaz MYO - Bilgisayar Programcılığı',
        gpa: '1.60/4.00',
        graduationYear: '2024'
      }
    },
    {
      id: 'events',
      icon: Award,
      title: 'Etkinlikler',
      description: 'Katıldığım Teknoloji Etkinlikleri',
      xp: 15,
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
      id: 'hobbies',
      icon: Star,
      title: 'Hobiler & İlgi Alanları',
      description: 'Boş Zamanlarımda Neler Yaparım?',
      xp: 10,
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

  const unlockAchievement = (id: string, xp: number) => {
    if (!unlockedAchievements.includes(id)) {
      setUnlockedAchievements([...unlockedAchievements, id]);
      addXP(xp);
    }
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800 dark:text-white flex items-center justify-center gap-2">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
          Karakter Özellikleri
        </h2>

        <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-blue-500" />
            Geliştirici & Girişimci Yolculuğu
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            Yazılım geliştirme ve girişimcilik tutkusuyla çıktığım yolculukta, bir yandan KOBİ'lere özel yazılım çözümleri üreterek iş dünyası deneyimi kazanırken, diğer yandan Unreal Engine ve C++ ile AAA kalitesinde oyunlar geliştirmeyi hedefliyorum. Yapay zeka teknolojilerini hem işletme çözümlerine hem de oyun geliştirme süreçlerine entegre ederek yenilikçi projeler üretiyorum.
          </p>
          <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            <p>🎮 Oyun Geliştirme: Unreal Engine, C++, Blueprint</p>
            <p>💼 İş Çözümleri: KOBİ'lere Özel Yazılım, İş Süreç Otomasyonu</p>
            <p>🤖 Teknoloji Entegrasyonu: Yapay Zeka, Süreç Optimizasyonu</p>
            <p>🚀 Hedef: AAA Oyun Stüdyosu & Teknoloji Girişimi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {achievements.map(({ id, icon: Icon, title, description, xp, ...details }) => (
            <div
              key={id}
              className={`p-4 sm:p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all ${
                unlockedAchievements.includes(id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => unlockAchievement(id, xp)}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Icon size={20} className={`sm:w-6 sm:h-6 ${unlockedAchievements.includes(id) ? 'text-white' : 'text-blue-500'}`} />
                <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                {!unlockedAchievements.includes(id) && (
                  <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-1 rounded-full animate-pulse">
                    +{xp} XP
                  </span>
                )}
              </div>
              <p className={`text-xs sm:text-sm ${unlockedAchievements.includes(id) ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                {description}
              </p>
              {unlockedAchievements.includes(id) && (
                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                  {id === 'education' && details.details && (
                    <div className="text-xs sm:text-sm">
                      <p>{details.details.university}</p>
                      <p>{details.details.department}</p>
                      <p>GPA: {details.details.gpa}</p>
                    </div>
                  )}
                  {id === 'events' && details.certificates && (
                    <div className="text-xs sm:text-sm">
                      {details.certificates.map((cert, index) => (
                        <div key={index} className="mb-1.5 sm:mb-2">
                          <p className="font-semibold">{cert.name}</p>
                          <p>{cert.issuer} • {cert.date}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {id === 'hobbies' && details.publications && (
                    <div className="text-xs sm:text-sm">
                      {details.publications.map((pub, index) => (
                        <div key={index} className="mb-1.5 sm:mb-2">
                          <p className="font-semibold">{pub.title}</p>
                          <p>{pub.platform}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}