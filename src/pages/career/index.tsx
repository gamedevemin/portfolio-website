import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface CareerProps {
  keşifSkoru: number;
  addKeşifSkoru: (amount: number) => void;
}

export function Career({ keşifSkoru, addKeşifSkoru }: CareerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Under Construction Content */}
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <Construction className="w-16 h-16 text-amber-500 mb-6 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300 mb-4">
            Kariyer Sayfası
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Bu sayfa yapım aşamasındadır. Çok yakında hizmetinizde olacaktır.
          </p>
        </div>
      </div>
    </motion.div>
  );
} 