import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Users, Map, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const headline = "Grandiose 2026: Your Roadmap to Property Ownership.";
  
  return (
    <main className="min-h-screen bg-ivory text-forest-950">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden pt-32 md:pt-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/djfqa4llc/image/upload/v1771627533/casa-venta-residencial-el-tigre-nuevo-nayarit-vista-lagos_b3ffcb.jpg"
            alt="Luxury Real Estate"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-forest-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ivory/20 to-ivory"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          {/* Trust Shield */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2"
          >
            <ShieldCheck className="text-lime-400 w-5 h-5" />
            <span className="text-sm font-bold tracking-wide text-white">RC 1642680 &middot; Subsidiary of Grandiose Group</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight leading-[1.1] md:leading-[0.9] mb-10 max-w-5xl text-white drop-shadow-2xl">
            {headline.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4 mb-2">
                {word.split('').map((char, j) => (
                  <span key={j} className="inline-block overflow-hidden">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) + (j * 0.03), ease: [0.22, 1, 0.36, 1] }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-6 mt-4"
          >
            <Link
              to="/projects"
              className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-lime-500 text-forest-950 font-black uppercase tracking-widest rounded-full transition-all hover:bg-lime-400 luxury-shadow"
            >
              <span className="relative z-10">View Active Sales</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Live Projects Counter */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        >
          {[
            { icon: Map, count: "3", label: "Active Smart Cities" },
            { icon: Users, count: "500+", label: "Verified Consultants" },
            { icon: LayoutGrid, count: "1,200+", label: "Plots Allocated" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-lime-500/10 p-4 rounded-2xl mb-4">
                <stat.icon className="text-lime-500 w-8 h-8" />
              </div>
              <h3 className="text-4xl md:text-5xl font-serif font-black mb-2">{stat.count}</h3>
              <p className="text-forest-950/50 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lime-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">The Grandiose Edge</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8">
                Securing Your Future in <br />
                <span className="text-gradient">Nigerian Real Estate</span>
              </h2>
              <p className="text-lg text-forest-950/60 mb-10 max-w-xl leading-relaxed">
                We bridge the gap between aspiration and ownership. Our developments are strategically located to ensure maximum appreciation while providing world-class infrastructure.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Verified Titles", desc: "C of O and Governor's Consent guaranteed." },
                  { title: "Smart Infrastructure", desc: "Solar power and automated security systems." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl luxury-shadow border border-black/5">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-forest-950/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-lime-500/10 blur-3xl rounded-full opacity-50"></div>
              <img
                src="https://res.cloudinary.com/djfqa4llc/image/upload/v1771627143/Real-estate-developer-in-Lagos-1024x1024.png.bv.webp_imq0jf.webp"
                alt="Grandiose Team"
                className="relative z-10 rounded-3xl luxury-shadow w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
