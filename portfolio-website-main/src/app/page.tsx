import { useState } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Footer } from '../components/Footer';

export default function Home() {
  const [keşifSkoru, setKeşifSkoru] = useState(0);

  const addKeşifSkoru = (amount: number) => {
    setKeşifSkoru(prev => prev + amount);
  };

  return (
    <main className="min-h-screen bg-black">
      <Hero keşifSkoru={keşifSkoru} addKeşifSkoru={addKeşifSkoru} />
      <About addKeşifSkoru={addKeşifSkoru} />
      <Skills addKeşifSkoru={addKeşifSkoru} />
      <Projects addKeşifSkoru={addKeşifSkoru} />
      <Footer />
    </main>
  );
} 