import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Play } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scrollRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

function useScrollReveal() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return { ref, inView };
}

export function Career() {
  const { ref, inView } = useScrollReveal();

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        className="min-h-screen bg-black text-white py-12 px-4"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12 mt-8 bg-[#4efaa7]/10 border-2 border-[#4efaa7] rounded-lg p-6 text-center relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#4efaa7]/20 blur-3xl rounded-full" />
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-[#4efaa7]/20 blur-3xl rounded-full" />
          <h1 className="text-3xl font-bold text-[#4efaa7] mb-3 relative">
            🚧 Üretim Aşamasında
          </h1>
          <p className="text-gray-300 text-lg relative">
            Karbon Solutions™ kariyer sayfası yapım aşamasındadır. Çok yakında sizlerle!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <section id="hero" className="text-center mb-16">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={scrollRevealVariants}
              className="mb-8"
            >
              <motion.p 
                variants={fadeUpVariants}
                className="text-2xl text-gray-300 mb-4 flex items-center justify-center gap-2"
              >
                <span>Teknoloji Sermayesi Üreten Şirket Modeli:</span>
                <span className="text-[#4efaa7]">Karbon Solutions</span>
              </motion.p>

              <motion.p
                variants={fadeUpVariants}
                className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm leading-relaxed"
              >
                Teknoloji ve sermaye birleşiminde yenilikçi bir yaklaşım. Sürdürülebilir büyüme, 
                otomasyon sistemleri ve değer üretimi odaklı bir model.
              </motion.p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://karbon.solutions/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center gap-2 bg-[#4efaa7]/10 hover:bg-[#4efaa7]/20 text-[#4efaa7] px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border border-[#4efaa7]/20 hover:border-[#4efaa7]/30"
              >
                <FileText size={16} />
                <span>Dökümantasyon</span>
              </motion.a>

              <motion.a
                href="https://www.youtube.com/watch?v=6ycMoPtJ0QE&list=PLincTZ4qjRT6IuHColG5GK1TOcKNTkdb8"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center gap-2 bg-[#4efaa7] hover:bg-[#3ef596] text-black px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-[#4efaa7]/20"
              >
                <Play size={16} />
                <span>Tanıtımı İzle</span>
              </motion.a>
            </div>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 