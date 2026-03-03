import { motion } from 'motion/react';
import { BookOpen, GraduationCap, FileText, ArrowRight, LogIn, Download } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Vault() {
  return (
    <main className="min-h-screen bg-ivory text-forest-950 pt-32 pb-24">
      <SEO 
        title="Investor Vault | Grandiose Homes"
        description="Access secure documents, master plans, and ROI projections for Grandiose Homes real estate investments in Nigeria."
      />
      <div className="container mx-auto px-6">
        {/* Header - Institutional Look */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-lime-500" />
            <span className="text-sm font-black tracking-[0.2em] uppercase text-lime-500">Training & Vision</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-8"
          >
            Empowering the Next Generation of Real Estate Leaders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-forest-950/60 leading-relaxed max-w-2xl"
          >
            Access our proprietary sales roadmap and stay informed about upcoming project unveilings.
          </motion.p>
        </div>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-lime-500/10 blur-3xl rounded-full opacity-50"></div>
            <img
              src="https://res.cloudinary.com/djfqa4llc/image/upload/f_webp,q_auto/v1771627533/Real-Estate-Expert-Educates-on-Rent-to-Own_of4k09.jpg"
              alt="Real Estate Expert Educates on Rent-to-Own houses in Lagos"
              className="relative z-10 w-full h-auto rounded-3xl luxury-shadow grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-3xl">
              <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full luxury-shadow flex items-center gap-3">
                <span className="font-black uppercase tracking-widest text-xs text-forest-950">Read Philosophy</span>
                <ArrowRight size={16} className="text-lime-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif font-black">Sales Roadmap & New Project Unveiling</h2>
            <div className="space-y-6 text-forest-950/70 leading-relaxed">
              <p>
                Our consultants are equipped with more than just property lists; they are trained in the "Grandiose Methodology" of wealth creation through real estate.
              </p>
              <p>
                Join our upcoming sessions to understand the 2026 roadmap and be the first to access our new project unveilings in the Lekki and Magboro corridors.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-forest-950 text-white font-black uppercase tracking-widest rounded-full hover:bg-forest-900 transition-all luxury-shadow group">
                <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                <span>Consultant Login</span>
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-black/10 text-forest-950 font-black uppercase tracking-widest rounded-full hover:bg-ivory transition-all luxury-shadow group">
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                <span>Download Training Schedule</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Roadmap Image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-3xl luxury-shadow h-[600px]"
        >
          <img
            src="https://res.cloudinary.com/djfqa4llc/image/upload/f_webp,q_auto/v1771627533/cf0bf90016e314294fb4a765a237221fl-b574619593rd-w960_h720_fe1w0q.jpg"
            alt="Grandiose Group Properties Roadmap Unveiling"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent flex flex-col justify-end p-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-lime-500" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-lime-500">Strategic Vision</span>
            </div>
            <h3 className="text-4xl font-serif font-black text-white mb-4">The 2026 Roadmap</h3>
            <p className="text-white/70 max-w-2xl leading-relaxed">
              A comprehensive blueprint for our upcoming residential and commercial hubs, designed to set new standards in Nigerian real estate.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
