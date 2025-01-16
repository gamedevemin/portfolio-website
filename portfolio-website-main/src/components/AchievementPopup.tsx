import React from 'react';
import { Trophy } from 'lucide-react';

interface AchievementPopupProps {
  message: string;
}

export function AchievementPopup({ message }: AchievementPopupProps) {
  return (
    <div className="fixed top-4 sm:top-20 left-1/2 -translate-x-1/2 bg-yellow-500 text-black 
      px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2 
      animate-achievement z-50 max-w-[90vw] sm:max-w-none">
      <Trophy className="text-yellow-900 w-5 h-5 sm:w-6 sm:h-6" />
      <span className="font-bold text-sm sm:text-base truncate">{message}</span>
    </div>
  );
}