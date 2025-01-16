import { motion } from 'framer-motion';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { Skills } from '../../components/Skills';
import { Projects } from '../../components/Projects';

interface PortfolioProps {
  keşifSkoru: number;
  addKeşifSkoru: (amount: number) => void;
}

export function Portfolio({ keşifSkoru, addKeşifSkoru }: PortfolioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-black pt-[52px]"
    >
      <div className="sm:transform-none transform scale-[0.92] origin-top">
        <Hero keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />
        <About addKeşifSkoru={addKeşifSkoru} />
        <Skills addKeşifSkoru={addKeşifSkoru} />
        <Projects addKeşifSkoru={addKeşifSkoru} />
      </div>
    </motion.div>
  );
} 