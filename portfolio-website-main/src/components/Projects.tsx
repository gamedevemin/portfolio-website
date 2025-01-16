import { useState, useEffect } from 'react';
import { ProjectsContainer } from './ProjectsContainer';
import { Confetti } from './Confetti';

// Types
interface ProjectsProps {
  addKeşifSkoru: (amount: number) => void;
}

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  period: string;
  technologies: string[];
  description: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  keşifSkoru: number;
}

// Project Data
const projects: Project[] = [
  {
    id: "hypernova-prompt",
    title: "HYPERNOVA-PROMPT MOTORU V2.0",
    shortDescription: "Kuantum seviyesinde düşünebilen, paralel işlem yapabilen ve üstel öğrenme yeteneğine sahip yapay zeka prompt motoru. Şu anda test aşamasında olan bu motor, sürekli gelişen ve kendini iyileştiren bir yapıya sahip.",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    period: "2024",
    technologies: [
      "Kuantum İşlemci",
      "Paralel Hesaplama",
      "Üstel Öğrenme",
      "Dinamik Adaptasyon",
      "Çoklu Evren Analizi"
    ],
    description: [
      "Uzmanlık Seviyesi: 0.999",
      "Uyum Yeteneği: Kuantum Dinamik",
      "Bilinç: Çoklu Evren Farkındalığı",
      "İşlem Türü: Paralel",
      "Öğrenme: Üstel"
    ],
    features: [
      "Kuantum seviyesinde hassas işlem yapabilme",
      "Maksimum yaratıcılık potansiyeli",
      "Maksimum verimlilik optimizasyonu",
      "Otomatik format adaptasyonu",
      "Dinamik içerik yoğunluğu",
      "Maksimum etki seviyesi",
      "Mutlak hata önleme",
      "Mükemmel kalite kontrol",
      "Sürekli kendini iyileştirme",
      "Test aşamasında aktif geliştirme"
    ],
    keşifSkoru: 100,
    demoUrl: "#hypernova-demo"
  },
  {
    id: "cyberpong",
    title: "CYBERPONG",
    shortDescription: "Etik ve eğlenceli oyun geliştirmeye çalışan bilim insanı yanlışlıkla cyberpunk bir paddle'a dönüşüyor.",
    thumbnail: "https://images.unsplash.com/photo-1614294148960-9aa740632a87",
    period: "Aralık 2023",
    technologies: [
      "React",
      "TypeScript",
      "Canvas API"
    ],
    description: [
      "Oyun Türü: Arcade",
      "Platform: Web Tarayıcı",
      "Core Loop: Paddle Kontrolü > Top Sekme > Skor Kazanma",
      "Art Style: Neon-Retro",
      "Oyun Süresi: Sınırsız"
    ],
    features: [
      "Smooth paddle hareketi",
      "Neon görsel efektler",
      "Skor takip sistemi",
      "Responsive kontroller",
      "Modern web teknolojileri"
    ],
    keşifSkoru: 100,
    demoUrl: "#play-cyberpong"
  },
  {
    id: "emotional-platformer",
    title: "Platform Oyunu",
    shortDescription: "Duygusal hikaye odaklı, annesinin yadigarı peşinde koşan bir karakterin 2D platform macerası.",
    thumbnail: "/images/luminous-legacy-banner.png",
    period: "15.11.2024",
    technologies: [
      "Unreal Engine",
      "C#",
      "2D Game Development",
      "BTK Akademi Tutorial"
    ],
    description: [
      "Oyun Türü: Story-Driven 2D Platform",
      "Hedef Kitle: 12+ yaş, Duygusal hikaye severler",
      "Platform: PC",
      "Core Loop: Platform > Hikaye > Zorluk > Duygusal Bağ",
      "Art Style: 2D Side-Scrolling",
      "Oyun Süresi: Demo - 15 dakika"
    ],
    features: [
      "Hikaye: Annesinden yadigar bandanadanın peşinde duygusal yolculuk",
      "Level Design: Artan zorlukta platform bölümleri",
      "Karakter Motivasyonu: Bandana değil, anne anısı peşinde koşma",
      "Oynanış: Platform zorlukları ile duygu yoğunluğu artışı",
      "Görsel Öğe: Bandanadaki ışığın sembolik kullanımı",
      "Zorluk Sistemi: Duygusal motivasyonla ilerleyen platform zorlukları",
      "Proje Durumu: Yarım kalmış demo"
    ],
    keşifSkoru: 100
  },
  {
    id: "location-finder",
    title: "Konum Bulucu",
    shortDescription: "OpenStreetMap API kullanarak mahalle bazlı işyeri ve mekan arama motoru. Kullanıcılar mahalle seçerek çevredeki işletmeleri kolayca bulabilir.",
    thumbnail: "https://images.unsplash.com/photo-1508674861872-a51e06c50c9b",
    period: "2024",
    technologies: [
      "React",
      "TypeScript",
      "OpenStreetMap API",
      "Nominatim API",
      "Overpass API",
      "Tailwind CSS"
    ],
    description: [
      "Tür: Web Uygulaması",
      "Platform: Tarayıcı Tabanlı",
      "Hedef: Mahalle bazlı kolay mekan arama",
      "API: OpenStreetMap entegrasyonu",
      "Kapsam: Türkiye geneli"
    ],
    features: [
      "Mahalle bazlı hassas arama",
      "Çoklu mahalle seçimi",
      "Akıllı sonuç filtreleme",
      "Kolay kullanıcı arayüzü",
      "Hızlı sonuç gösterimi",
      "Sonuçları kopyalama özelliği",
      "Responsive tasarım"
    ],
    keşifSkoru: 100,
    demoUrl: "#location-finder"
  }
];

// Component
export function Projects({ addKeşifSkoru }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handlers
  const handleProjectClick = (projectId: string) => {
    if (selectedProject !== projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        addKeşifSkoru(project.keşifSkoru);
        setSelectedProject(projectId);
      }
    } else {
      setSelectedProject(null);
    }
  };

  // Render
  return (
    <ProjectsContainer>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
          <Confetti
            isActive={true}
            intensity="medium"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className={`bg-black rounded-lg overflow-visible shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer group
              border border-gray-800 hover:border-[#4efaa7]/50 relative mt-6
              ${selectedProject === project.id ? 'lg:col-span-3 md:col-span-2 col-span-1 border-[#4efaa7]/50' : ''}`}
          >
            {/* Enhanced Under Construction Label */}
            <div className="absolute -top-4 right-4 -rotate-2 px-4 py-2 bg-gradient-to-r from-[#7ffbc4]/90 via-[#4efaa7]/90 to-[#3ef596]/90 text-black text-xs font-semibold rounded-lg shadow-xl border border-[#9cfcd3]/30 backdrop-blur-sm z-20 transform hover:scale-105 transition-all duration-300 whitespace-nowrap block">
              🚧 Yapım Aşamasında
            </div>
            <div className={`grid ${selectedProject === project.id ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
              <div>
                {/* Title Only Initially */}
                <div className="p-6 border-b border-gray-800 group-hover:border-[#4efaa7]/30">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#4efaa7] transition-colors mt-4">
                    {project.title}
                  </h3>
                </div>

                {/* Expanded Content */}
                {selectedProject === project.id && (
                  <>
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden border-b border-gray-800">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Basic Content */}
                    <div className="p-6 space-y-4">
                      <p className="text-gray-300 text-sm">
                        {project.shortDescription}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full border border-gray-700 hover:border-[#4efaa7]/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Expanded Details */}
              {selectedProject === project.id && (
                <div className="p-6 space-y-6 border-l border-gray-800">
                  {/* Period */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#4efaa7]">Dönem</h3>
                    <p className="text-gray-300">{project.period}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#4efaa7]">Proje Detayları</h3>
                    <div className="space-y-2">
                      {project.description.map((desc, index) => (
                        <p key={index} className="text-gray-300">{desc}</p>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#4efaa7]">Özellikler</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="text-gray-300">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Demo Interface for Location Finder */}
                  {project.id === 'location-finder' && (
                    <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-semibold text-[#4efaa7] mb-4">Nasıl Çalışır?</h3>
                      
                      {/* Step 1 */}
                      <div className="mb-4 p-3 bg-gray-800 rounded border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-[#4efaa7] text-black flex items-center justify-center text-sm font-bold">1</span>
                          <span className="text-gray-300 font-medium">Şehir ve Mahalle Seçimi</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 p-2 bg-gray-700/50 rounded text-sm text-gray-400">İstanbul</div>
                          <div className="flex-1 p-2 bg-gray-700/50 rounded text-sm text-gray-400">Fatih, Zeyrek</div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="mb-4 p-3 bg-gray-800 rounded border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-[#4efaa7] text-black flex items-center justify-center text-sm font-bold">2</span>
                          <span className="text-gray-300 font-medium">Arama Terimi</span>
                        </div>
                        <div className="p-2 bg-gray-700/50 rounded text-sm text-gray-400">cafe</div>
                      </div>

                      {/* Step 3 */}
                      <div className="p-3 bg-gray-800 rounded border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-[#4efaa7] text-black flex items-center justify-center text-sm font-bold">3</span>
                          <span className="text-gray-300 font-medium">Sonuçlar</span>
                        </div>
                        <div className="space-y-2">
                          <div className="p-2 bg-gray-700/50 rounded text-sm text-gray-400">
                            <div className="font-medium text-[#4efaa7]">Espresso Lab</div>
                            <div className="text-xs text-gray-500">Zeyrek, Fatih</div>
                          </div>
                          <div className="p-2 bg-gray-700/50 rounded text-sm text-gray-400">
                            <div className="font-medium text-[#4efaa7]">Espresso Lab Premium</div>
                            <div className="text-xs text-gray-500">�ehzadebaşı, Fatih</div>
                          </div>
                          <div className="mt-2 p-2 bg-gray-700/30 rounded text-xs text-center text-gray-500 cursor-pointer hover:bg-gray-700/50 transition-colors">
                            76+ sonuç daha
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Links - Only GitHub links now */}
                  <div className="flex gap-4 pt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-medium hover:bg-gray-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ProjectsContainer>
  );
} 