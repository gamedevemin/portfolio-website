import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { Z_INDEX } from '../styles/z-index';

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  intensity?: 'low' | 'medium' | 'high';
}

const INTENSITY_CONFIG = {
  low: {
    numberOfPieces: 150,
    initialVelocityY: 35
  },
  medium: {
    numberOfPieces: 400,
    initialVelocityY: 50,
    spread: 120
  },
  high: {
    numberOfPieces: 600,
    initialVelocityY: 55,
    spread: 150
  }
};

const confettiColors = [
  '#4efaa7', // ana renk
  '#3ef596', // koyu
  '#1eb563', // çok koyu
  '#158f4f', // en koyu
  '#7ffbc4', // orta-açık
  '#9cfcd3', // açık
  '#f0fef7'  // çok açık
];

export function Confetti({ isActive, duration = 3000, intensity = 'medium' }: ConfettiProps) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isActive) return null;

  const config = INTENSITY_CONFIG[intensity];

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: Z_INDEX.CONFETTI,
        background: 'none'
      }}
    >
      <ReactConfetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={config.numberOfPieces}
        gravity={0.2}
        friction={0.99}
        initialVelocityY={config.initialVelocityY}
        colors={confettiColors}
        opacity={1}
      />
    </div>
  );
} 