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
    numberOfPieces: 250,
    initialVelocityY: 45
  },
  high: {
    numberOfPieces: 350,
    initialVelocityY: 55
  }
};

export function Confetti({ isActive, duration = 3000, intensity = 'medium' }: ConfettiProps) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [key, setKey] = useState(0);

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

  useEffect(() => {
    if (isActive) {
      setKey(prev => prev + 1);
    }
  }, [isActive]);

  if (!isActive) return null;

  const config = INTENSITY_CONFIG[intensity];

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: Z_INDEX.CONFETTI }}>
      <ReactConfetti
        key={key}
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={config.numberOfPieces}
        gravity={0.25}
        friction={0.99}
        wind={0.02}
        colors={[
          '#F59E0B', // amber-500
          '#D97706', // amber-600
          '#92400E', // amber-800
          '#78350F', // amber-900
          '#FBBF24', // amber-400
          '#FDE68A', // amber-200
          '#FFFBEB'  // amber-50
        ]}
        opacity={0.9}
        initialVelocityY={config.initialVelocityY}
        tweenDuration={100}
        dragFriction={0.12}
      />
    </div>
  );
} 