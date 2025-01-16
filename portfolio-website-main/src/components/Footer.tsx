import { Github, Linkedin, Mail, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Muhammed Emin Çelenk</h3>
          <p className="text-gray-400 text-sm">
            Jr. UE Blueprint & Python Geliştirici olarak AAA kalitesinde oyunlar ve yapay zeka sistemleri geliştirmeyi hedefliyorum.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Sosyal Medya</h3>
          <div className="flex gap-4">
            <a href="https://github.com/gamedevemin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/devemin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://youtube.com/@emincelenk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="mailto:emntarcin@tutamail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">İletişim</h3>
          <a href="mailto:emntarcin@tutamail.com" className="text-gray-400 hover:text-white transition-colors text-sm">
            emntarcin@tutamail.com
          </a>
          <p className="text-gray-500 text-sm mt-4">
            © 2024 Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
} 