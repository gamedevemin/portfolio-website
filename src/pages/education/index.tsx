import { motion } from 'framer-motion';
import { Play, Users, Clock, VideoIcon, GraduationCap, CreditCard } from 'lucide-react';

interface EducationProps {
  keşifSkoru: number;
  addKeşifSkoru: (amount: number) => void;
}

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

// Kurs detayları
const courseDetails = {
  course_name: "Temel Yapay Zeka Eğitimi",
  target_audience: "Tüm yaş grupları",
  description: "Herkes için uygun, özenle hazırlanmış interaktif videolar aracılığıyla temel yapay zeka eğitimi sunuyoruz.",
  duration: "Toplam 3 saat",
  format: "İnteraktif videolardan oluşur",
  price: {
    standard: "499 TL",
    student: "299 TL"
  }
};

export function Education({ keşifSkoru, addKeşifSkoru }: EducationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
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
            {courseDetails.course_name}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {courseDetails.description}
          </p>
        </motion.div>

        {/* Kurs Detayları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Hedef Kitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Hedef Kitle</h3>
                <p className="text-gray-400">{courseDetails.target_audience}</p>
              </div>
            </div>
          </motion.div>

          {/* Süre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Süre</h3>
                <p className="text-gray-400">{courseDetails.duration}</p>
              </div>
            </div>
          </motion.div>

          {/* Format */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <VideoIcon className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Format</h3>
                <p className="text-gray-400">{courseDetails.format}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fiyatlandırma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standart Fiyat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent opacity-20" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <CreditCard className="w-8 h-8 text-amber-500" />
                <h3 className="text-2xl font-semibold text-gray-100">Standart</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-500">{courseDetails.price.standard}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-medium py-3 px-6 rounded-lg shadow-lg shadow-amber-500/20">
                Hemen Başla
              </button>
            </div>
          </motion.div>

          {/* Öğrenci Fiyatı */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent opacity-20" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-semibold text-gray-100">Öğrenci</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-500">{courseDetails.price.student}</span>
                <span className="text-gray-400 text-sm ml-2">Öğrenci kimliği gereklidir</span>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-blue-500/20">
                Öğrenci Kaydı
              </button>
            </div>
          </motion.div>
        </div>

        {/* Alt Bilgi */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-2">
            Daha fazla bilgi için bizimle iletişime geçin
          </p>
          <a 
            href="mailto:eminexedev@gmail.com"
            className="text-amber-500 hover:text-amber-400 transition-colors duration-300"
          >
            eminexedev@gmail.com
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
} 