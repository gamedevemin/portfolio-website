import { ReactNode } from 'react';

interface ProjectsContainerProps {
  children: ReactNode;
}

export function ProjectsContainer({ children }: ProjectsContainerProps) {
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Projeler
          </h2>
          <p className="text-lg text-gray-300">
            <span className="text-amber-500 font-semibold">Yapay Zeka Ajanları</span> desteğiyle geliştirilen projelerim
          </p>
        </div>
        {children}
      </div>
    </div>
  );
} 