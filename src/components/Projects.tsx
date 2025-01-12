import { useState, useCallback, useRef, useEffect } from 'react';
import { Code2, Calendar, Award, ArrowRight, Github, ExternalLink } from 'lucide-react';
import { CyberPong } from './CyberPong';

interface ProjectsProps {
  addXP: (amount: number) => void;
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
  demoComponent?: string;
  xp: number;
  onDemoClick?: () => void;
}

interface SearchResult {
  name: string;
  address: string;
  phone: string;
  website?: string;
  description?: string;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
  deadline?: string;
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  completedPomodoros: number;
}

interface NewTask {
  text: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
}

interface Note {
  id: string;
  text: string;
  timestamp: string;
  tags: string[];
}

interface OpenStreetMapElement {
  tags?: {
    name?: string;
    description?: string;
    business?: string;
    service?: string;
    keywords?: string;
    'addr:street'?: string;
    'addr:housenumber'?: string;
    'addr:district'?: string;
    phone?: string;
    'contact:phone'?: string;
    mobile?: string;
    website?: string;
  };
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
}

export function Projects({ addXP }: ProjectsProps) {
  const [unlockedProjects, setUnlockedProjects] = useState<string[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>(['#FF0000', '#00FF00', '#0000FF']);
  const [stocks, setStocks] = useState<{name: string; quantity: number}[]>([]);
  const [billData, setBillData] = useState({
    companyName: '',
    amount: '',
    type: 'fatura'
  });
  const [soundEffect, setSoundEffect] = useState({
    description: '',
    style: '8bit',
    volume: 50
  });
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [pomodoroState, setPomodoroState] = useState({
    time: 25 * 60,
    isRunning: false,
    mode: 'pomodoro' as 'pomodoro' | 'shortBreak' | 'longBreak',
    focusMode: false,
    sessions: 0,
    music: {
      isPlaying: false,
      volume: 50,
      type: 'lofi' as 'lofi' | 'nature' | 'white-noise'
    },
    dailyGoal: 8,
    todayPomodoros: 0,
    streak: 0,
    level: 1,
    xp: 0,
    nextLevelXp: 100
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTask>({
    text: '',
    deadline: '',
    priority: 'medium',
    estimatedPomodoros: 1
  });
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<{text: string; tags: string[]}>({
    text: '',
    tags: []
  });
  const [showNotes, setShowNotes] = useState(false);
  const [waterReminder, setWaterReminder] = useState(0);
  const [showPdf, setShowPdf] = useState(false);
  const [consecutivePomodoros, setConsecutivePomodoros] = useState(0);
  const [showGameModal, setShowGameModal] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'İlk Pomodoro',
      description: 'İlk pomodoro seansını tamamladın!',
      unlocked: false
    },
    {
      id: 2,
      title: 'Su Ustası',
      description: 'Günde 8 bardak su içme hedefine ulaştın!',
      unlocked: false
    },
    {
      id: 3,
      title: 'Odak Savaşçısı',
      description: 'Arka arkaya 4 pomodoro tamamladın!',
      unlocked: false
    }
  ]);
  const [lastBreakTime, setLastBreakTime] = useState<Date | null>(null);

  const samplePdf = `
    Ders Notları - Matematik
    
    1. Türev
    - Anlık değişim hızı
    - Teğet doğrusunun eğimi
    - Limit kullanarak türev alma
    
    2. İntegral
    - Belirsiz integral
    - Belirli integral
    - Alan hesaplama
    
    3. Örnekler
    ...
  `;

  const taskCategories = [
    { id: 'study', name: 'Ders Çalışma', icon: '📚', color: 'blue' },
    { id: 'homework', name: 'Ödev', icon: '📝', color: 'green' },
    { id: 'exam', name: 'Sınav', icon: '📋', color: 'red' },
    { id: 'project', name: 'Proje', icon: '🎯', color: 'purple' }
  ];

  const motivationalQuotes = [
    "\"Hiç bilenlerle bilmeyenler bir olur mu?\" (Zümer Suresi, 9)",
    "\"İlim öğrenmek her Müslüman erkek ve kadına farzdır.\" (Hz. Muhammed)",
    "\"Beşikten mezara kadar ilim öğreniniz.\" (Hz. Muhammed)",
    "\"Kim ilim için yola çıkarsa, Allah ona cennetin yolunu kolaylaştırır.\" (Hz. Muhammed)",
    "\"Hikmet müminin yitik malıdır, onu nerede bulursa alır.\" (Hz. Muhammed)",
    "\"Rabbim! İlmimi artır.\" (Taha Suresi, 114)",
    "\"İlim tahsil etmek için seyahat eden kimse, dönünceye kadar Allah yolundadır.\" (Hz. Muhammed)",
    "\"Ya öğreten, ya öğrenen, ya dinleyen, ya da ilmi seven ol.\" (Hz. Muhammed)",
    "\"Allah kimin hayrını dilerse onu dinde fakih (bilgili) kılar.\" (Hz. Muhammed)",
    "\"İlim meclisleri cennet bahçeleridir.\" (Hz. Muhammed)",
    "\"Alimin mürekkebi, şehidin kanından daha kutsaldır.\" (Hz. Muhammed)",
    "\"İlim öğrenin. İlim sahibi için de, öğrenmek isteyen için de hayır vardır.\" (Hz. Muhammed)",
    "\"Oku! Yaratan Rabbinin adıyla oku.\" (Alak Suresi, 1)",
    "\"De ki: Rabbim, ilmimi artır.\" (Taha Suresi, 114)",
    "\"Allah'tan hakkıyla ancak alim kulları korkar.\" (Fatır Suresi, 28)",
    "\"İlim Çin'de de olsa gidip alınız.\" (Hz. Muhammed)",
    "\"En hayırlınız Kur'an'ı öğrenen ve öğretendir.\" (Hz. Muhammed)",
    "\"İlim öğrenmek için gösterilen tevazu, ilmin şerefini artırır.\" (Hz. Muhammed)",
    "\"Bir saat ilim öğrenmek, gece boyu ibadet etmekten hayırlıdır.\" (Hz. Muhammed)",
    "\"Kim bir ilim yoluna girerse, Allah ona cennetin yolunu kolaylaştırır.\" (Hz. Muhammed)",
    "\"İlim hazinedir, anahtarı ise soru sormaktır.\" (Hz. Muhammed)",
    "\"İnsanlar iki kısımdır: Alimler ve öğrenciler. Diğerleri boş böceklerdir.\" (Hz. Muhammed)",
    "\"İlmi gençlikte öğrenin. Çünkü gençlikte öğrenmek taşa yazmak gibidir.\" (Hz. Muhammed)",
    "\"Bildiğiyle amel eden kişiye Allah bilmediğini öğretir.\" (Hz. Muhammed)",
    "\"İlim ve hikmet müminin yitik malıdır.\" (Hz. Muhammed)",
    "\"İlim tahsili için evinden çıkan kişi, evine dönünceye kadar Allah yolundadır.\" (Hz. Muhammed)",
    "\"İlmi müzakere etmek (tekrar etmek) nafile namazdan hayırlıdır.\" (Hz. Muhammed)",
    "\"Alimlerin mürekkebi şehitlerin kanıyla tartılır.\" (Hz. Muhammed)",
    "\"İlim ve hikmet, müminin kaybolmuş malıdır; onu nerede bulursa almaya daha layıktır.\" (Hz. Muhammed)",
    "\"İlim meclislerinde bulunmak, bin rekat nafile namazdan hayırlıdır.\" (Hz. Muhammed)"
  ];

  const searchLocations = async (neighborhood: string, keyword: string) => {
    setLoading(true);
    try {
      const areaResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          neighborhood + ', İstanbul, Turkey'
        )}&format=json&limit=1`
      );
      const areaData = await areaResponse.json();
      
      if (areaData.length > 0) {
        const { boundingbox } = areaData[0];
        const [south, north, west, east] = boundingbox.map(Number);
        
        const gridSize = 0.005;
        const latSteps = Math.ceil((north - south) / gridSize);
        const lonSteps = Math.ceil((east - west) / gridSize);
        
        let allResults: SearchResult[] = [];
        
        for (let i = 0; i < latSteps; i++) {
          for (let j = 0; j < lonSteps; j++) {
            const gridLat = south + (i * gridSize);
            const gridLon = west + (j * gridSize);
            
            const query = `
              [out:json][timeout:25];
              (
                node["name"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
                node["description"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
                node["business"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
                node["service"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
                node["keywords"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
                node["shop"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
                node["amenity"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
                node["craft"~"${keyword}",i]
                  (around:500,${gridLat},${gridLon});
              );
              out body;
            `;
            
            try {
              const gridResponse = await fetch(
                `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
              );
              const gridData = await gridResponse.json();
              
              const gridResults = gridData.elements
                .filter((element: OpenStreetMapElement) => {
                  const name = (element.tags?.name || '').toLowerCase();
                  const description = (element.tags?.description || '').toLowerCase();
                  const business = (element.tags?.business || '').toLowerCase();
                  const service = (element.tags?.service || '').toLowerCase();
                  const keywords = (element.tags?.keywords || '').toLowerCase();
                  
                  const searchKeyword = keyword.toLowerCase();
                  
                  return name.includes(searchKeyword) ||
                         description.includes(searchKeyword) ||
                         business.includes(searchKeyword) ||
                         service.includes(searchKeyword) ||
                         keywords.includes(searchKeyword);
                })
                .map((element: OpenStreetMapElement) => ({
                  name: element.tags?.name || 'İsimsiz İşletme',
                  address: element.tags?.['addr:street'] 
                    ? `${element.tags['addr:street']} ${element.tags['addr:housenumber'] || ''}, ${element.tags['addr:district'] || ''}`
                    : 'Adres bilgisi yok',
                  phone: element.tags?.phone || element.tags?.['contact:phone'] || element.tags?.mobile || 'Telefon bilgisi yok',
                  website: element.tags?.website,
                  description: element.tags?.description
                }));
              
              allResults = [...allResults, ...gridResults];
            } catch (error) {
              console.error(`Grid (${gridLat},${gridLon}) arama hatası:`, error);
            }
          }
        }
        
        const uniqueResults = allResults.filter((result, index, self) =>
          index === self.findIndex((r) => r.name === result.name && r.address === result.address)
        );
        
        const sortedResults = uniqueResults.sort((a, b) => {
          const aHasKeyword = a.name.toLowerCase().includes(keyword.toLowerCase());
          const bHasKeyword = b.name.toLowerCase().includes(keyword.toLowerCase());
          if (aHasKeyword && !bHasKeyword) return -1;
          if (!aHasKeyword && bHasKeyword) return 1;
          return 0;
        });
        
        setSearchResults(sortedResults);
        
        if (sortedResults.length === 0) {
          alert(`"${keyword}" ile ilgili sonuç bulunamadı. Lütfen başka bir anahtar kelime deneyin.`);
        } else {
          alert(`${sortedResults.length} sonuç bulundu.`);
        }
      } else {
        alert('Mahalle bulunamadı. Lütfen geçerli bir mahalle adı girin.');
      }
    } catch (error) {
      console.error('Arama hatası:', error);
      alert('Arama sırasında bir hata oluştu.');
    }
    setLoading(false);
  };

  const copyResults = () => {
    const text = searchResults
      .map(result => {
        let info = `İşletme: ${result.name}\n`;
        info += `Adres: ${result.address}\n`;
        if (result.phone !== 'Telefon bilgisi yok') info += `Telefon: ${result.phone}\n`;
        if (result.website) info += `Website: ${result.website}\n`;
        if (result.description) info += `Açıklama: ${result.description}\n`;
        return info + '-------------------';
      })
      .join('\n\n');
    navigator.clipboard.writeText(text);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateNewPalette = () => {
    const newColors = Array(5).fill(0).map(() => generateRandomColor());
    setSelectedColors(newColors);
  };

  const copyColorCodes = () => {
    const colorText = selectedColors.join('\n');
    navigator.clipboard.writeText(colorText);
    alert('Renk kodları kopyalandı!');
  };

  const projects: Project[] = [
    {
      id: 'cyberpong',
      title: 'Cyberpong - 2D Pong',
      shortDescription: 'Türler arası geçiş yapan, evrimleşen bir Pong remake.',
      thumbnail: '/images/cyberpong.png',
      period: '2024',
      technologies: [
        'React',
        'TypeScript',
        'Canvas API'
      ],
      description: [
        'Oyun Türü: Arcade',
        'Platform: Web Tarayıcı',
        'Core Loop: Paddle Kontrolü > Top Sekme > Skor Kazanma',
        'Art Style: Neon-Retro',
        'Oyun Süresi: Sınırsız'
      ],
      features: [
        'Smooth paddle hareketi',
        'Neon görsel efektler',
        'Skor takip sistemi',
        'Responsive kontroller',
        'Modern web teknolojileri'
      ],
      xp: 100,
      demoUrl: '#play-cyberpong',
      onDemoClick: () => setShowGameModal(true)
    },
    {
      id: 'emotional-platformer',
      title: 'Platform Oyunu',
      shortDescription: 'Duygusal hikaye odaklı, annesinin yadigarı peşinde koşan bir karakterin 2D platform macerası.',
      thumbnail: '/images/luminous-legacy-banner.png',
      period: '15.11.2024',
      technologies: [
        'Unreal Engine',
        'C#',
        '2D Game Development',
        'BTK Akademi Tutorial'
      ],
      description: [
        'Oyun Türü: Story-Driven 2D Platform',
        'Hedef Kitle: 12+ yaş, Duygusal hikaye severler',
        'Platform: PC',
        'Core Loop: Platform > Hikaye > Zorluk > Duygusal Bağ',
        'Art Style: 2D Side-Scrolling',
        'Oyun Süresi: Demo - 15 dakika'
      ],
      features: [
        'Hikaye: Annesinden yadigar bandananın peşinde duygusal yolculuk',
        'Level Design: Artan zorlukta platform bölümleri',
        'Karakter Motivasyonu: Bandana değil, anne anısı peşinde koşma',
        'Oynanış: Platform zorlukları ile duygu yoğunluğu artışı',
        'Görsel Öğe: Bandanadaki ışığın sembolik kullanımı',
        'Zorluk Sistemi: Duygusal motivasyonla ilerleyen platform zorlukları',
        'Proje Durumu: Yarım kalmış demo'
      ],
      xp: 25
    },
    {
      id: 'location-finder',
      title: 'Konum Bulucu',
      shortDescription: 'OpenStreetMap kullanarak mahalle bazlı işyeri ve konum bilgisi toplama aracı.',
      thumbnail: 'https://images.unsplash.com/photo-1508674861872-a51e06c50c9b',
      period: '20.12.2024',
      technologies: [
        'React',
        'Tailwind CSS',
        'OpenStreetMap API',
        'TypeScript',
        'Nominatim Search'
      ],
      description: [
        'Proje Tipi: Web Uygulaması',
        'Hedef Kitle: Yerel işletme araştırmacıları',
        'Platform: Web Tarayıcı',
        'Core Loop: Mahalle Gir > Anahtar Kelime Gir > Sonuçları Kopyala',
        'UI Style: Minimalist, Modern',
        'API: Ücretsiz OpenStreetMap servisleri'
      ],
      features: [
        'UI Bileşenleri: 2 input alanı, arama butonu, kopyalama butonu',
        'Input 1: Mahalle adı girişi',
        'Input 2: Anahtar kelime girişi (örn: berber, market)',
        'Çıktı: İşletme adı, adres, iletişim bilgileri',
        'Veri Kaynağı: OpenStreetMap ve Nominatim',
        'Kopyalama: Tek tıkla tüm sonuçları panoya kopyalama',
        'Maliyet: Tamamen ücretsiz kullanım'
      ],
      xp: 20
    },
    {
      id: 'stock-track',
      title: 'Stok Takip',
      shortDescription: 'Basit ve hızlı stok takip sistemi.',
      thumbnail: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a',
      period: '27.12.2024',
      technologies: [
        'React',
        'LocalStorage',
        'TailwindCSS',
        'Chart.js'
      ],
      description: [
        'Proje Tipi: Web Uygulaması',
        'Hedef Kitle: Perakendeciler',
        'Platform: Tüm Tarayıcılar',
        'Veri: Yerel Depolama',
        'Analiz: Basit Grafikler'
      ],
      features: [
        'Hızlı Ürün Ekleme',
        'Stok Alarmı',
        'Satış Takibi',
        'Basit Raporlama',
        'Excel Export'
      ],
      demoComponent: 'StockTrackDemo',
      xp: 30
    },
    {
      id: 'sprite-animate',
      title: 'Animasyon Aracı',
      shortDescription: 'Sprite animasyonlarını anında test etme aracı.',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
      period: '28.12.2024',
      technologies: [
        'React',
        'Canvas API',
        'TailwindCSS'
      ],
      description: [
        'Proje Tipi: Web Aracı',
        'Hedef Kitle: 2D Oyun Geliştiricileri',
        'Platform: Tüm Tarayıcılar',
        'Format: PNG Sprite Sheet',
        'Export: GIF, MP4'
      ],
      features: [
        'Sprite Sheet Yükleme',
        'FPS Kontrolü',
        'Frame Düzenleme',
        'Döngü Ayarları',
        'Animasyon Export'
      ],
      demoComponent: 'SpriteAnimateDemo',
      xp: 25
    },
    {
      id: 'sound-fx',
      title: 'Ses Efekt',
      shortDescription: 'Metin girişiyle oyun ses efekti üretme aracı.',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
      period: '02.01.2025',
      technologies: [
        'React',
        'Web Audio API',
        'ToneJS',
        'TailwindCSS'
      ],
      description: [
        'Proje Tipi: Web Aracı',
        'Hedef Kitle: Oyun Geliştiricileri',
        'Platform: Tüm Tarayıcılar',
        'Format: WAV, MP3',
        'Efekt: 50+ Temel Ses'
      ],
      features: [
        'Metin ile Ses Üretme',
        'Efekt Karıştırma',
        'Ses Düzenleme',
        'Paket Oluşturma',
        'Unity Import'
      ],
      demoComponent: 'SoundFXDemo',
      xp: 30
    },
    {
      id: 'study-flow',
      title: 'Çalışma Asistanı',
      shortDescription: 'Öğrenci odaklı, all-in-one pomodoro ve görev yönetim uygulaması.',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
      period: '10.01.2025',
      technologies: [
        'React',
        'TailwindCSS',
        'LocalStorage',
        'Web Notifications'
      ],
      description: [
        'Proje Tipi: Web Uygulaması',
        'Hedef Kitle: Öğrenciler',
        'Platform: Tüm Tarayıcılar',
        'Veri: Yerel Depolama',
        'Tema: Adaptif Arayüz'
      ],
      features: [
        'Pomodoro Zamanlayıcı',
        'Akıllı Görev Yönetimi',
        'Odak Modu',
        'Çalışma İstatistikleri',
        'Bildirim Sistemi'
      ],
      xp: 35
    }
  ].filter(project => project.id !== 'quick-bill');

  const unlockProject = (id: string, xp: number) => {
    if (!unlockedProjects.includes(id)) {
      setUnlockedProjects([...unlockedProjects, id]);
      addXP(xp);
    }
    setActiveProject(id);
  };

  // QuickBill Functions
  const generateBill = () => {
    if (!billData.companyName || !billData.amount) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    const billText = `
      Firma: ${billData.companyName}
      Tutar: ${billData.amount} TL
      Tür: ${billData.type === 'fatura' ? 'Fatura' : 'Fiş'}
      Tarih: ${new Date().toLocaleDateString()}
    `;

    // Create blob and download
    const blob = new Blob([billText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${billData.type}-${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // StockTrack Functions
  const [newStock, setNewStock] = useState({
    name: '',
    quantity: ''
  });

  const addStock = () => {
    if (!newStock.name || !newStock.quantity) {
      alert('Lütfen ürün adı ve adet girin');
      return;
    }

    const quantity = parseInt(newStock.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Lütfen geçerli bir adet girin');
      return;
    }

    setStocks(prev => [...prev, { name: newStock.name, quantity }]);
    setNewStock({ name: '', quantity: '' });
  };

  // Audio error handling
  type AudioError = {
    name: string;
    message: string;
    code?: number;
  };

  // Müzik için state ve ref tanımlamaları
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  // Müzik yükleme ve kontrol fonksiyonları
  useEffect(() => {
    const audio = new Audio("/audio/background-music.mp3");
    
    const handleLoadedData = () => {
      console.log('Müzik başarıyla yüklendi');
      setAudioLoaded(true);
    };

    const handleError = (e: AudioError) => {
      console.error('Müzik yükleme hatası:', e);
      alert('Müzik dosyası yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', handleLoadedData);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Ses kontrolü
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = pomodoroState.music.volume / 100;
    }
  }, [pomodoroState.music.volume]);

  // Müzik çalma/durdurma
  const toggleMusic = useCallback(() => {
    if (!audioRef.current || !audioLoaded) return;

    setPomodoroState(prev => {
      const newIsPlaying = !prev.music.isPlaying;
      
      if (newIsPlaying) {
        audioRef.current?.play().catch(error => {
          console.error('Müzik çalma hatası:', error);
          alert('Müzik çalınamadı. Lütfen tekrar deneyin.');
        });
      } else {
        audioRef.current?.pause();
      }
      
      return {
        ...prev,
        music: { ...prev.music, isPlaying: newIsPlaying }
      };
    });
  }, [audioLoaded]);

  // Not ekleme
  const addNote = () => {
    if (!newNote.text) return;
    
    setNotes(prev => [{
      id: Date.now().toString(),
      text: newNote.text,
      timestamp: new Date().toISOString(),
      tags: newNote.tags
    }, ...prev]);
    
    setNewNote({ text: '', tags: [] });
  };

  // Not silme
  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Mola hatırlatıcısı
  const checkBreakTime = () => {
    if (lastBreakTime) {
      const timeSinceBreak = new Date().getTime() - lastBreakTime.getTime();
      const minutesSinceBreak = Math.floor(timeSinceBreak / (1000 * 60));
      
      if (minutesSinceBreak >= 45) {
        return "⚠️ 45 dakikadır mola vermediniz!";
      }
    }
    return null;
  };

  // Level sistemi
  const checkLevelUp = () => {
    if (pomodoroState.xp >= pomodoroState.nextLevelXp) {
      setPomodoroState(prev => ({
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - prev.nextLevelXp,
        nextLevelXp: Math.floor(prev.nextLevelXp * 1.5)
      }));
      return true;
    }
    return false;
  };

  // Başarım kontrolü
  const checkAchievements = () => {
    const newAchievements = [...achievements];
    
    // İlk pomodoro kontrolü
    if (!achievements[0].unlocked && pomodoroState.sessions > 0) {
      newAchievements[0].unlocked = true;
    }
    
    // Su ustası kontrolü
    if (!achievements[1].unlocked && waterReminder >= 8) {
      newAchievements[1].unlocked = true;
    }
    
    // Odak savaşçısı kontrolü
    if (!achievements[2].unlocked && consecutivePomodoros >= 4) {
      newAchievements[2].unlocked = true;
    }
    
    setAchievements(newAchievements);
  };

  // Proje durumlarını belirleyelim
  const getProjectStatus = (id: string) => {
    switch(id) {
      case 'cyberpong':
        return { label: 'ALPHA', bgColor: 'bg-red-100 dark:bg-red-900/30', textColor: 'text-red-900 dark:text-red-100', borderColor: 'border-red-200 dark:border-red-800' };
      case 'emotional-platformer':
        return { label: 'PROOF OF CONCEPT', bgColor: 'bg-orange-100 dark:bg-orange-900/30', textColor: 'text-orange-900 dark:text-orange-100', borderColor: 'border-orange-200 dark:border-orange-800' };
      case 'location-finder':
        return { label: 'PROTOTYPE', bgColor: 'bg-amber-100 dark:bg-amber-900/30', textColor: 'text-amber-900 dark:text-amber-100', borderColor: 'border-amber-200 dark:border-amber-800' };
      case 'stock-track':
        return { label: 'BETA', bgColor: 'bg-purple-100 dark:bg-purple-900/30', textColor: 'text-purple-900 dark:text-purple-100', borderColor: 'border-purple-200 dark:border-purple-800' };
      case 'sprite-animate':
        return { label: 'CONCEPT', bgColor: 'bg-gray-100 dark:bg-gray-900/30', textColor: 'text-gray-900 dark:text-gray-100', borderColor: 'border-gray-200 dark:border-gray-800' };
      case 'sound-fx':
        return { label: 'CONCEPT', bgColor: 'bg-gray-100 dark:bg-gray-900/30', textColor: 'text-gray-900 dark:text-gray-100', borderColor: 'border-gray-200 dark:border-gray-800' };
      case 'study-flow':
        return { label: 'BETA', bgColor: 'bg-purple-100 dark:bg-purple-900/30', textColor: 'text-purple-900 dark:text-purple-100', borderColor: 'border-purple-200 dark:border-purple-800' };
      default:
        return { label: 'CONCEPT', bgColor: 'bg-gray-100 dark:bg-gray-900/30', textColor: 'text-gray-900 dark:text-gray-100', borderColor: 'border-gray-200 dark:border-gray-800' };
    }
  };

  const incrementWater = () => {
    setWaterReminder(prev => prev + 1);
  };

  // Modal komponenti
  const GameModal = () => {
    if (!showGameModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-4xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">CyberPong</h3>
            <button 
              onClick={() => setShowGameModal(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <CyberPong />
        </div>
      </div>
    );
  };

  // Timer ve Focus Mode fonksiyonları
  const exitFocusMode = () => {
    setPomodoroState(prev => ({
      ...prev,
      focusMode: false
    }));
  };

  const toggleFocusMode = () => {
    setPomodoroState(prev => ({
      ...prev,
      focusMode: !prev.focusMode
    }));
  };

  const toggleTimer = () => {
    setPomodoroState(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const resetTimer = () => {
    setPomodoroState(prev => ({
      ...prev,
      time: 25 * 60,
      isRunning: false
    }));
  };

  const switchMode = (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    setPomodoroState(prev => ({
      ...prev,
      mode,
      time: mode === 'pomodoro' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60,
      isRunning: false
    }));
  };

  // Task yönetimi fonksiyonları
  const addTask = () => {
    if (!newTask.text) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask.text,
      completed: false,
      deadline: newTask.deadline,
      priority: newTask.priority,
      estimatedPomodoros: newTask.estimatedPomodoros,
      completedPomodoros: 0
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({
      text: '',
      deadline: '',
      priority: 'medium',
      estimatedPomodoros: 1
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Audio fonksiyonları
  const initAudio = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(audioCtx);
  };

  const generateSound = () => {
    if (!audioContext) return;
    
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.type = soundEffect.style === '8bit' ? 'square' : 'sine';
    osc.frequency.value = 440;
    gainNode.gain.value = soundEffect.volume / 100;
    
    setOscillator(osc);
    osc.start();
    osc.stop(audioContext.currentTime + 0.5);
  };

  const downloadSound = () => {
    if (!audioContext || !oscillator) return;
    
    const duration = 0.5;
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < buffer.length; i++) {
      data[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate);
    }
    
    const blob = new Blob([audioBufferToWav(buffer)], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sound.wav';
    a.click();
    URL.revokeObjectURL(url);
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    
    const wav = new ArrayBuffer(44 + buffer.length * blockAlign);
    const view = new DataView(wav);
    
    // WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + buffer.length * blockAlign, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
    view.setUint32(40, buffer.length * blockAlign, true);
    
    const channelData = new Float32Array(buffer.length);
    buffer.copyFromChannel(channelData, 0, 0);
    
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
    
    return new Uint8Array(wav);
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <GameModal />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800 dark:text-white flex items-center justify-center gap-2">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
          Projeler
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`rounded-lg shadow-lg transition-all duration-300 cursor-pointer overflow-hidden
                ${unlockedProjects.includes(project.id) 
                  ? 'bg-white dark:bg-gray-800' 
                  : 'bg-gray-100 dark:bg-gray-900 filter grayscale'}`}
              onClick={() => unlockProject(project.id, project.xp)}
            >
              <div className="relative h-48 overflow-hidden">
                {project.id === 'emotional-platformer' ? (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <img 
                      src="/images/luminous-legacy-banner.png"
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                  </>
                ) : (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {!unlockedProjects.includes(project.id) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full animate-pulse">
                      +{project.xp} XP
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    {(() => {
                      const status = getProjectStatus(project.id);
                      return (
                        <span className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase border ${status.bgColor} ${status.textColor} ${status.borderColor} rounded-full`}>
                          {status.label}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <Calendar size={16} />
                    <span>{project.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {project.shortDescription}
                  </p>
                </div>

                {unlockedProjects.includes(project.id) && activeProject === project.id && (
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <ArrowRight size={16} className="text-blue-500" />
                        Proje Detayları
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {project.description.map((desc, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <Award size={16} className="text-blue-500" />
                        Özellikler
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {project.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                          <span>Kaynak Kod</span>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          onClick={(e) => {
                            e.preventDefault();
                            if (project.onDemoClick) {
                              project.onDemoClick();
                            }
                          }}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500"
                        >
                          <ExternalLink size={16} />
                          <span>Oyna</span>
                        </a>
                      )}
                    </div>

                    {project.id === 'location-finder' && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
                          Konum Bulucu
                        </h4>
                        <div className="space-y-4">
                          <input
                            type="text"
                            id="neighborhood"
                            placeholder="Mahalle adı giriniz"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          />
                          <input
                            type="text"
                            id="keyword"
                            placeholder="Anahtar kelime giriniz (örn: berber, market)"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          />
                          <button
                            onClick={() => {
                              const neighborhood = (document.getElementById('neighborhood') as HTMLInputElement).value;
                              const keyword = (document.getElementById('keyword') as HTMLInputElement).value;
                              searchLocations(neighborhood, keyword);
                            }}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                            disabled={loading}
                          >
                            {loading ? 'Aranıyor...' : 'Ara ve Kopyala'}
                          </button>
                          
                          {searchResults.length > 0 && (
                            <div className="mt-4">
                              <div className="max-h-60 overflow-y-auto space-y-2">
                                {searchResults.map((result, index) => (
                                  <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                                    <p className="font-semibold">{result.name}</p>
                                    <p className="text-sm">{result.address}</p>
                                    <p className="text-sm">{result.phone}</p>
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={copyResults}
                                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                              >
                                Sonuçları Kopyala
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {project.id === 'quick-bill' && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={billData.companyName}
                            onChange={(e) => setBillData({...billData, companyName: e.target.value})}
                            placeholder="Firma Adı"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          />
                          <input
                            type="number"
                            value={billData.amount}
                            onChange={(e) => setBillData({...billData, amount: e.target.value})}
                            placeholder="Tutar"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          />
                          <select 
                            value={billData.type}
                            onChange={(e) => setBillData({...billData, type: e.target.value})}
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          >
                            <option value="fatura">Fatura</option>
                            <option value="fis">Fiş</option>
                          </select>
                          <button 
                            onClick={generateBill}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            Oluştur ve İndir
                          </button>
                        </div>
                      </div>
                    )}

                    {project.id === 'stock-track' && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newStock.name}
                              onChange={(e) => setNewStock({...newStock, name: e.target.value})}
                              placeholder="Ürün Adı"
                              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                            <input
                              type="number"
                              value={newStock.quantity}
                              onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
                              placeholder="Adet"
                              className="w-24 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <button 
                            onClick={addStock}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            Stok Ekle
                          </button>
                          <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-md p-2 overflow-y-auto">
                            {stocks.length === 0 ? (
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                Henüz stok eklenmedi...
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {stocks.map((stock, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm p-2 bg-white dark:bg-gray-700 rounded">
                                    <span>{stock.name}</span>
                                    <span className="font-semibold">{stock.quantity} adet</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 'sprite-animate' && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="space-y-4">
                          <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              Sprite önizleme alanı
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                            <input
                              type="number"
                              placeholder="FPS"
                              className="w-20 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                            Animasyonu Başlat
                          </button>
                        </div>
                      </div>
                    )}

                    {project.id === 'sound-fx' && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={soundEffect.description}
                            onChange={(e) => setSoundEffect({...soundEffect, description: e.target.value})}
                            placeholder="Ses efektini tanımlayın (örn: 'patlama sesi', 'madeni para')"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          />
                          <div className="flex gap-2">
                            <select 
                              value={soundEffect.style}
                              onChange={(e) => setSoundEffect({...soundEffect, style: e.target.value})}
                              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                              <option value="8bit">8-Bit</option>
                              <option value="realistic">Gerçekçi</option>
                              <option value="cartoon">Karikatür</option>
                            </select>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={soundEffect.volume}
                              onChange={(e) => setSoundEffect({...soundEffect, volume: parseInt(e.target.value)})}
                              className="w-32"
                            />
                          </div>
                          <div className="flex justify-center gap-4">
                            <button 
                              onClick={() => {
                                initAudio();
                                generateSound();
                              }}
                              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                            >
                              <span className="sr-only">Oynat</span>
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              </svg>
                            </button>
                            <button 
                              onClick={downloadSound}
                              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                            >
                              <span className="sr-only">İndir</span>
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 'study-flow' && (
                      <div 
                        className={`mt-6 p-4 rounded-lg ${
                          pomodoroState.focusMode ? 'bg-gray-900 text-white cursor-pointer' : 'bg-gray-50 dark:bg-gray-700'
                        }`}
                        onClick={exitFocusMode}
                      >
                        <div className="space-y-6">
                          {pomodoroState.focusMode ? (
                            // Odak Modu - Minimal
                            <div className="text-center space-y-8">
                              <div className="text-8xl font-bold">
                                {Math.floor(pomodoroState.time / 60)}
                              </div>
                              <p className="text-sm text-gray-400">Odak modundan çıkmak için ekrana tıklayın</p>
                            </div>
                          ) : (
                            <>
                              {/* Progress Bar - Ateşli */}
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl">🔥</span>
                                    <span className="text-xl font-bold">{pomodoroState.streak}</span>
                                    <span className="text-sm text-gray-500">gün</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Günlük Hedef:</span>
                                    <div className="flex gap-1">
                                      {Array.from({length: pomodoroState.dailyGoal}).map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-2 h-2 rounded-full ${
                                            i < pomodoroState.todayPomodoros
                                              ? 'bg-gradient-to-r from-yellow-400 to-red-500 animate-pulse'
                                              : 'bg-gray-300 dark:bg-gray-600'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Timer ve Müzik Kontrolü */}
                              <div className="text-center space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={toggleMusic}
                                      className={`p-2 rounded-full ${
                                        pomodoroState.music.isPlaying
                                          ? 'bg-purple-500 text-white'
                                          : 'bg-gray-200 dark:bg-gray-600'
                                      }`}
                                    >
                                      {pomodoroState.music.isPlaying ? '🔊' : '🔈'}
                                    </button>
                                    <select
                                      value={pomodoroState.music.type}
                                      onChange={(e) => setPomodoroState(prev => ({
                                        ...prev,
                                        music: { ...prev.music, type: e.target.value }
                                      }))}
                                      className="p-2 rounded bg-transparent border"
                                    >
                                      <option value="lofi">Lo-Fi</option>
                                      <option value="nature">Doğa Sesleri</option>
                                      <option value="white-noise">White Noise</option>
                                    </select>
                                  </div>
                                  <div className="flex gap-2">
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={pomodoroState.music.volume}
                                      onChange={(e) => setPomodoroState(prev => ({
                                        ...prev,
                                        music: { ...prev.music, volume: parseInt(e.target.value) }
                                      }))}
                                      className="w-24"
                                    />
                                  </div>
                                </div>

                                <div className="flex justify-center gap-2">
                                  {['pomodoro', 'shortBreak', 'longBreak'].map((mode) => (
                                    <button 
                                      key={mode}
                                      onClick={() => switchMode(mode as any)}
                                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                        pomodoroState.mode === mode
                                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                          : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300'
                                      }`}
                                    >
                                      {mode === 'pomodoro' ? '25:00' : mode === 'shortBreak' ? '5:00' : '15:00'}
                                    </button>
                                  ))}
                                </div>
                                
                                <div className="text-6xl font-bold">
                                  {Math.floor(pomodoroState.time / 60)}:{(pomodoroState.time % 60).toString().padStart(2, '0')}
                                </div>
                                
                                <div className="flex justify-center gap-3">
                                  <button 
                                    onClick={toggleTimer}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700"
                                  >
                                    {pomodoroState.isRunning ? 'Duraklat' : 'Başlat'}
                                  </button>
                                  <button 
                                    onClick={resetTimer}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600"
                                  >
                                    Sıfırla
                                  </button>
                                  <button 
                                    onClick={toggleFocusMode}
                                    className="px-6 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600"
                                  >
                                    {pomodoroState.focusMode ? 'Normal Mod' : 'Odak Modu'}
                                  </button>
                                </div>
                              </div>

                              {/* Quick Actions ve Not Alma */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                  <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-medium">Hızlı Notlar</h3>
                                    <button 
                                      onClick={() => setShowNotes(!showNotes)} 
                                      className="text-sm text-blue-500 hover:text-blue-600"
                                    >
                                      {showNotes ? 'Gizle' : 'Göster'} ({notes.length})
                                    </button>
                                  </div>
                                  {showNotes && (
                                    <>
                                      <div className="flex gap-2 mb-2">
                                        <input
                                          type="text"
                                          value={newNote.text}
                                          onChange={(e) => setNewNote(prev => ({ ...prev, text: e.target.value }))}
                                          placeholder="Yeni not..."
                                          className="flex-1 p-2 text-sm rounded border dark:bg-gray-700"
                                        />
                                        <button
                                          onClick={addNote}
                                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div className="h-32 overflow-y-auto space-y-2">
                                        {notes.map(note => (
                                          <div key={note.id} className="flex justify-between items-start p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                                            <div>
                                              <div>{note.text}</div>
                                              <div className="text-xs text-gray-500">
                                                {new Date(note.timestamp).toLocaleTimeString()}
                                              </div>
                                            </div>
                                            <button
                                              onClick={() => deleteNote(note.id)}
                                              className="text-red-500 hover:text-red-600"
                                            >
                                              ×
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                  <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-medium">Hızlı Erişim</h3>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <button onClick={incrementWater} className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm hover:bg-blue-200">
                                      💧 Su İç ({waterReminder})
                                    </button>
                                    <button onClick={() => setShowPdf(!showPdf)} className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-sm hover:bg-purple-200">
                                      📄 PDF Aç
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Task Management - Enhanced */}
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                  <h3 className="font-medium">Görevler</h3>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={newTask.text}
                                      onChange={(e) => setNewTask(prev => ({ ...prev, text: e.target.value }))}
                                      placeholder="Yeni görev..."
                                      className="flex-1 p-2 text-sm rounded border dark:bg-gray-700"
                                    />
                                    <select
                                      value={newTask.priority}
                                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                                      className="w-32 p-2 text-sm rounded border dark:bg-gray-700"
                                    >
                                      <option value="low">🟢 Düşük</option>
                                      <option value="medium">🟡 Orta</option>
                                      <option value="high">🔴 Yüksek</option>
                                    </select>
                                    <button
                                      onClick={addTask}
                                      className="px-4 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                    >
                                      Ekle
                                    </button>
                                  </div>

                                  <div className="h-48 overflow-y-auto space-y-2">
                                    {tasks.map(task => (
                                      <div 
                                        key={task.id}
                                        className={`p-3 rounded-lg flex items-center gap-3 ${
                                          task.completed 
                                            ? 'bg-gray-100 dark:bg-gray-700' 
                                            : 'bg-white dark:bg-gray-800 border dark:border-gray-700'
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={task.completed}
                                          onChange={() => toggleTask(task.id)}
                                          className="w-4 h-4"
                                        />
                                        <div className="flex-1">
                                          <div className={task.completed ? 'line-through text-gray-500' : ''}>
                                            {task.text}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {task.completedPomodoros} / {task.estimatedPomodoros} 🍅
                                          </div>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-xs ${
                                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-green-100 text-green-800'
                                        }`}>
                                          {task.priority === 'high' ? 'Yüksek' :
                                           task.priority === 'medium' ? 'Orta' : 'Düşük'}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}