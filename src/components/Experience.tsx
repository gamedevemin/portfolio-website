import { useState } from 'react';
import { Code2, Calendar, Award, ArrowRight, Github, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  addXP: (amount: number) => void;
}

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  period: string;
  technologies: string[];
  description: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  xp: number;
}

export function Projects({ addXP }: ProjectsProps) {
  const [unlockedProjects, setUnlockedProjects] = useState<string[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: 'cyberpong',
      title: 'Cyberpong',
      shortDescription: 'Eğitsel elementler içeren, hikaye tabanlı, evrimleşen bir 2D Pong remake oyunu',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', // Geçici görsel
      period: '11.12.2024',
      technologies: [
        'Python',
        'Pygame',
        'Cursor IDE Agent',
        'ChatGPT'
      ],
      description: [
        'Bilim insanı karakterinin yanlışlıkla Pong paddle\'ına dönüşmesiyle başlayan, türler arası geçiş yapan bir oyun deneyimi',
        'Oyuncunun seçtiği bilim dalına göre özelleşen eğitsel içerik',
        'Learn & Fun vizyonuyla tasarlanmış oynanış mekanikleri',
        'Dinamik zorluk sistemi ile her 5 skorda yeni top eklenmesi',
        'Paddle\'ın evrimleşme mekanikleri ve süper güç sistemi',
        'Çoklu oyun türü geçişi (Pong\'dan Platform oyununa)',
        'Kişiselleştirilmiş eğitsel içerik sistemi'
      ],
      features: [
        'Dash yeteneği ve süper güç sistemi',
        'Paddle\'ın hız artışı ve ekran kenarlarını sarma yeteneği',
        'Toplarla kimyasal birleşme finali',
        'Süper güçlere sahip toplar ve geçici paddle güçlendirmeleri',
        'Progresif zorluk artışı ve çoklu top sistemi',
        'Bilim dalına özel eğitsel sorular',
        'İkinci bölümde platform oyunu deneyimi (geliştirme aşamasında)'
      ],
      xp: 30
    }
  ];

  const unlockProject = (id: string, xp: number) => {
    if (!unlockedProjects.includes(id)) {
      setUnlockedProjects([...unlockedProjects, id]);
      addXP(xp);
    }
    setActiveProject(id);
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800 dark:text-white flex items-center justify-center gap-2">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
          Projeler
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`rounded-lg shadow-lg transition-all duration-300 cursor-pointer overflow-hidden
                ${unlockedProjects.includes(project.id) 
                  ? 'bg-white dark:bg-gray-800' 
                  : 'bg-gray-100 dark:bg-gray-900 filter grayscale'}`}
              onClick={() => unlockProject(project.id, project.xp)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {!unlockedProjects.includes(project.id) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full animate-pulse">
                      +{project.xp} XP
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <Calendar size={16} />
                    <span>{project.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {project.shortDescription}
                  </p>
                </div>

                {unlockedProjects.includes(project.id) && activeProject === project.id && (
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <ArrowRight size={16} className="text-blue-500" />
                        Proje Detayları
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {project.description.map((desc, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <Award size={16} className="text-blue-500" />
                        Özellikler
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {project.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                          <span>Kaynak Kod</span>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                          <span>Canlı Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}