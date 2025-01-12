import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';

function App() {
  const [xp, setXp] = useState(0);

  const addXP = (amount: number) => {
    setXp(prevXp => {
      const newXp = prevXp + amount;
      return newXp;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation xp={xp} addXP={addXP} />
      <Hero addXP={addXP} />
      <About addXP={addXP} />
      <Skills addXP={addXP} />
      <Projects addXP={addXP} />
      <Experience addXP={addXP} />
    </div>
  );
}

export default App;