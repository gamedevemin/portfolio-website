import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface LibraryProps {
  keşifSkoru: number;
  addKeşifSkoru: (amount: number) => void;
}

export function Library({ keşifSkoru, addKeşifSkoru }: LibraryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <Construction className="w-16 h-16 text-[#4efaa7] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#4efaa7] mb-2">
          Bu sayfa yapım aşamasındadır
        </h1>
        <p className="text-gray-400">
          Çok yakında hizmetinizde olacak...
        </p>
      </div>
    </motion.div>
  );
} 