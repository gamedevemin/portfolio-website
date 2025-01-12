import React from 'react';
import { Trophy } from 'lucide-react';

interface AchievementPopupProps {
  message: string;
}

export function AchievementPopup({ message }: AchievementPopupProps) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-achievement z-50">
      <Trophy className="text-yellow-900" size={24} />
      <span className="font-bold">{message}</span>
    </div>
  );
}