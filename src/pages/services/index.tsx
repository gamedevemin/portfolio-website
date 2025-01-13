import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Sparkles, X as CloseIcon } from 'lucide-react';
import { useState } from 'react';

interface ServicesProps {
  keşifSkoru: number;
  addKeşifSkoru: (amount: number) => void;
}

interface FormData {
  serviceName: string;
  questions: FormQuestion[];
  isOpen: boolean;
}

interface FormQuestion {
  question: string;
  options: string[];
}

interface FormValues {
  [key: string]: {
    selectedOption: string;
    otherValue?: string;
  };
}

// Form soruları
const formQuestions = {
  "Website Demo": [
    {
      question: "Proje türü?",
      options: ["Kişisel", "Küçük İşletme", "E-ticaret", "Diğer"]
    },
    {
      question: "İstediğiniz zaman çizelgesi?",
      options: ["1 ay içinde", "1-3 Ay", "3-6 Ay", "6+ Ay", "Diğer"]
    },
    {
      question: "Gerekli özel özellikler?",
      options: ["Kullanıcı Girişi", "Ödeme Sistemi", "Blog", "Diğer"]
    },
    {
      question: "Bütçeniz?",
      options: ["5000 TL altı", "5000 - 10000 TL", "10000-20000 TL", "20000+ TL", "Diğer"]
    }
  ],
  "Yazılım Çözümleri": [
    {
      question: "Hangi problemi çözmeye çalışıyorsunuz?",
      options: ["Stok Yönetimi", "Müşteri İlişkileri", "Satış Takibi", "Diğer"]
    },
    {
      question: "Yazılımla ilgili iş hedefleriniz neler?",
      options: ["Verimliliği artırmak", "Maliyetleri düşürmek", "Operasyonları ölçeklendirmek", "Diğer"]
    },
    {
      question: "Gerekli entegrasyonlar?",
      options: ["Muhasebe Yazılımı", "CRM Yazılımı", "Üçüncü Parti API'ler", "Diğer"]
    },
    {
      question: "İşletmenizin ölçeği nedir?",
      options: ["Startup", "Küçük İşletme", "Orta Ölçekli İşletme", "Büyük İşletme", "Diğer"]
    }
  ],
  "2D/3D Oyun Projesi": [
    {
      question: "Oyun türü?",
      options: ["Bulmaca", "Aksiyon", "Strateji", "RPG", "Diğer"]
    },
    {
      question: "Hedef platformlar?",
      options: ["Mobil (iOS)", "Mobil (Android)", "PC", "Konsol", "Diğer"]
    },
    {
      question: "Hedef kitle?",
      options: ["Çocuklar", "Gençler", "Yetişkinler", "Genel Kitle", "Diğer"]
    },
    {
      question: "Bütçeniz?",
      options: ["10000 TL altı", "10000-50000 TL", "50000-100000 TL", "100000+ TL", "Diğer"]
    },
    {
      question: "İlham aldığınız/benzer oyunlar?",
      options: ["Evet, net bir vizyonum var", "Evet, referans oyunlarım var", "Hayır, net bir vizyonum yok", "Diğer"]
    }
  ],
  "Mobil Uygulama": [
    {
      question: "Hedef işletim sistemi?",
      options: ["iOS", "Android", "Her ikisi", "Diğer"]
    },
    {
      question: "Temel özellikler?",
      options: ["Kullanıcı Girişi", "Konum Servisleri", "Bildirimler", "Ödeme Entegrasyonu", "Diğer"]
    },
    {
      question: "Benzer uygulamalar var mı?",
      options: ["Evet, belirli kısımları beğeniyorum", "Evet, mevcut uygulamalardan memnun değilim", "Hayır, özgün bir fikir", "Diğer"]
    },
    {
      question: "Zaman çizelgeniz nedir?",
      options: ["1 ay içinde", "1-3 Ay", "3-6 Ay", "6+ Ay", "Diğer"]
    }
  ]
};

// Sayfa animasyon varyantları
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

// Kart animasyon varyantları
const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Form animasyon varyantları
const formVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

// Hizmetler verisi
const services = [
  {
    service_name: "Website Demo",
    description: "Modern ve özelleştirilebilir web siteleri. SEO uyumlu, hızlı ve responsive tasarımlar. İlk kez çalışacak müşterilerimize özel ücretsiz demo. Sınırlı kontenjan - Hemen başvurun!",
    price: "2999 TL'den başlayan fiyatlarla",
    demo: {
      available: true,
      cost: "Ücretsiz",
      conditions: "İlk kez çalışacak müşterilerimiz için ücretsiz"
    },
    call_to_action: "Ücretsiz demo için başvurun",
    gradient: "from-amber-500/10 via-amber-400/5 to-transparent",
    value_prop: "Profesyonel web varlığınızı oluşturun"
  },
  {
    service_name: "Yazılım Çözümleri",
    description: "İşletmenizi dijitalleştirin ve verimliliğinizi artırın. CRM'den ERP'ye, stok yönetiminden e-ticarete kadar 50'den fazla özel çözüm. Her ölçekteki işletme için uygun, ölçeklenebilir sistemler. Ücretsiz danışmanlık ile size en uygun çözümü belirleyelim!",
    price: "2999 TL'den başlayan fiyatlarla",
    demo: {
      available: false,
      cost: "Mevcut değil",
      conditions: "Mevcut değil"
    },
    call_to_action: "Ücretsiz danışmanlık alın",
    gradient: "from-gray-500/10 via-gray-400/5 to-transparent",
    value_prop: "İş süreçlerinizi optimize edin"
  },
  {
    service_name: "2D/3D Oyun Projesi",
    description: "Oyun fikrinizi gerçeğe dönüştürün. Unity ve Unreal Engine ile profesyonel oyun geliştirme. Karakterler, seviyeler, mekanikler ve tam oyun sistemleri. Sınırlı kontenjan - Şimdi başvurun!",
    price: "Proje bazlı fiyatlandırma",
    demo: {
      available: true,
      cost: "Değişken",
      conditions: "Demo mevcut, memnun kalınmadığı takdirde demo ücretinin %50'si iade"
    },
    call_to_action: "Projenizi başlatın",
    gradient: "from-purple-500/10 via-purple-400/5 to-transparent",
    value_prop: "Oyun fikrinizi hayata geçirin"
  },
  {
    service_name: "Mobil Uygulama",
    description: "Mobil dünyada yerinizi alın. Cross-platform geliştirme ile iOS ve Android için tek kod tabanı. Modern UI/UX tasarımı ve performans optimizasyonu. İlk kez çalışacak müşterilerimize özel demo fırsatı!",
    price: "2999 TL'den başlayan fiyatlarla",
    demo: {
      available: true,
      cost: "Ücretsiz",
      conditions: "İlk kez çalışacak müşterilerimiz için ücretsiz (temel arayüz)"
    },
    call_to_action: "Mobil dönüşümü başlatın",
    gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
    value_prop: "Mobilde müşterilerinizle buluşun"
  }
];

export function Services({ keşifSkoru, addKeşifSkoru }: ServicesProps) {
  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    questions: [],
    isOpen: false
  });

  const [formValues, setFormValues] = useState<FormValues>({});

  const handleFormOpen = (serviceName: string) => {
    setFormData({
      serviceName,
      questions: formQuestions[serviceName as keyof typeof formQuestions],
      isOpen: true
    });
    setFormValues({});
  };

  const handleFormClose = () => {
    setFormData(prev => ({ ...prev, isOpen: false }));
    setFormValues({});
  };

  const handleOptionChange = (question: string, selectedOption: string) => {
    setFormValues(prev => ({
      ...prev,
      [question]: {
        selectedOption,
        otherValue: selectedOption === 'Diğer' ? prev[question]?.otherValue || '' : undefined
      }
    }));
  };

  const handleOtherValueChange = (question: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [question]: {
        ...prev[question],
        otherValue: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form Data:', {
      service: formData.serviceName,
      answers: formValues
    });
    handleFormClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Test Phase Notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/90 text-amber-500 p-4 rounded-lg mb-6 text-center"
        >
          <p className="text-sm sm:text-base">
            Bu sayfa test aşamasındadır. Bazı özellikler beklendiği gibi çalışmayabilir.
          </p>
        </motion.div>

        {/* Başlık */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text mb-4">
            Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Modern teknolojiler ve yenilikçi çözümlerle işletmenizi bir adım öne taşıyın
          </p>
        </motion.div>

        {/* Hizmetler Grid */}
        <div className="
          grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 
          px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto
        ">
          {services.map((service) => (
            <motion.div
              key={service.service_name}
              variants={cardVariants}
              className="
                relative overflow-hidden bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8
              "
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Başlık */}
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  {service.service_name}
                </h2>

                {/* Açıklama */}
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed line-clamp-4">
                  {service.description}
                </p>

                {/* Fiyat */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base text-amber-500 font-medium">
                    {service.price}
                  </span>
                </div>

                {/* Demo Bilgisi */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                  {service.demo.available ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0" />
                  ) : (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0" />
                  )}
                  <span className="text-sm sm:text-base text-gray-300">
                    Demo: {service.demo.cost}
                  </span>
                  {service.demo.available && (
                    <span className="text-xs sm:text-sm text-gray-400 w-full mt-1 ml-6">
                      ({service.demo.conditions})
                    </span>
                  )}
                </div>

                {/* Testimonial */}
                <p className="text-xs text-gray-400 mb-4 sm:mb-6">
                  {service.testimonial}
                </p>

                {/* Value Proposition */}
                <p className="text-sm text-amber-500 font-medium mb-4">
                  {service.value_prop}
                </p>

                {/* CTA Butonu */}
                <button 
                  onClick={() => handleFormOpen(service.service_name)}
                  className="
                    w-full bg-gradient-to-r from-amber-500 to-amber-600 
                    text-gray-900 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg 
                    transition-all duration-300 
                    flex items-center justify-center gap-2
                    shadow-lg shadow-amber-500/20
                    text-sm sm:text-base
                  "
                >
                  {service.call_to_action}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alt Bilgi */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-2">
            Özel projeleriniz için bizimle iletişime geçin
          </p>
          <a 
            href="mailto:eminexedev@gmail.com"
            className="text-amber-500 hover:text-amber-400 transition-colors duration-300"
          >
            eminexedev@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Form Overlay */}
      <AnimatePresence>
        {formData.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleFormClose}
          >
            <motion.div
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Form Başlığı */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-100">
                  {formData.serviceName}
                </h3>
                <button 
                  onClick={handleFormClose}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {formData.questions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {question.question}
                    </label>
                    <select
                      value={formValues[question.question]?.selectedOption || ''}
                      onChange={(e) => handleOptionChange(question.question, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="" disabled>Seçiniz</option>
                      {question.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    
                    {formValues[question.question]?.selectedOption === 'Diğer' && (
                      <input
                        type="text"
                        value={formValues[question.question]?.otherValue || ''}
                        onChange={(e) => handleOtherValueChange(question.question, e.target.value)}
                        placeholder="Lütfen belirtiniz..."
                        className="mt-2 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-medium py-2 px-4 rounded-lg shadow-lg shadow-amber-500/20"
                >
                  Gönder
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 