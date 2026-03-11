import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', path: '/', image: 'https://res.cloudinary.com/djfqa4llc/image/upload/v1771627533/casa-venta-residencial-el-tigre-nuevo-nayarit-vista-lagos_b3ffcb.jpg' },
  { name: 'Properties', path: '/properties', image: 'https://res.cloudinary.com/djfqa4llc/image/upload/v1771627326/zylushomespCwmqaAysDzk11-1024x575_st5g8r.jpg' },
  { name: 'Ileri Smart City', path: '/projects', image: 'https://res.cloudinary.com/djfqa4llc/image/upload/v1771627414/661e39652a6cb7ab105b3bc5cdb31510a25d98f7_kf3lqa.jpg' },
  { name: 'Investor Vault', path: '/vault', image: 'https://res.cloudinary.com/djfqa4llc/image/upload/v1771627533/Real-Estate-Expert-Educates-on-Rent-to-Own_of4k09.jpg' },
  { name: 'Command Center', path: '/contact', image: 'https://res.cloudinary.com/djfqa4llc/image/upload/v1771627143/Real-estate-developer-in-Lagos-1024x1024.png.bv.webp_imq0jf.webp' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const activeImage = links.find(l => l.path === hoveredLink)?.image || links[0].image;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="relative z-50">
            <img
              src="https://res.cloudinary.com/djfqa4llc/image/upload/v1772541880/grandiose1_hoaxso.png"
              alt="Grandiose Homes"
              className="h-10 md:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className={`relative z-50 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
              scrolled ? 'text-forest-950 hover:text-lime-500' : 'text-lime-500 hover:text-white'
            }`}
            aria-label="Open Menu"
          >
            <Menu size={32} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-forest-950/95 backdrop-blur-xl flex"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-lime-500 transition-colors z-50"
              aria-label="Close Menu"
            >
              <X size={40} />
            </button>

            {/* 2-Column Layout */}
            <div className="flex w-full h-full">
              {/* Left Side (Visual) */}
              <div className="hidden lg:block w-1/2 relative overflow-hidden bg-forest-950">
                <div className="absolute inset-0 bg-forest-950/40 z-10 transition-colors duration-700"></div>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt="Menu Visual"
                    className="w-full h-full object-cover grayscale"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Right Side (Links) */}
              <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:pl-24">
                <nav className="flex flex-col items-center lg:items-start justify-center space-y-8 w-full">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                      onMouseEnter={() => setHoveredLink(link.path)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="relative group flex flex-col items-center lg:items-start"
                    >
                      <Link
                        to={link.path}
                        className={`text-4xl sm:text-5xl md:text-7xl font-serif font-black tracking-tight transition-colors text-center lg:text-left min-h-[44px] flex items-center ${
                          location.pathname === link.path ? 'text-lime-500' : 'text-white group-hover:text-white/80'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {/* Hover Line */}
                      <motion.div
                        className="h-1 bg-lime-500 mt-2 origin-center lg:origin-left w-full lg:w-auto"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredLink === link.path ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
