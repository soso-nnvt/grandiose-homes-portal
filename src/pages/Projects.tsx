import { motion } from 'motion/react';
import { MapPin, TrendingUp, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Projects() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Ileri Smart City",
    "description": "Premium smart city plots in Magboro, Lagos axis. Features 24/7 security, steady power, and smart infrastructure.",
    "url": "https://grandiosehomes.com/projects",
    "image": "https://res.cloudinary.com/djfqa4llc/image/upload/f_webp,q_auto/v1771627326/zylushomespCwmqaAysDzk11-1024x575_st5g8r.jpg",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NGN",
      "price": "5000000",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Grandiose Homes & Investment Limited",
      "identifier": "RC 1642680"
    }
  };

  return (
    <main className="min-h-screen bg-ivory text-forest-950 pt-32 pb-24">
      <SEO 
        title="Invest in Ileri Smart City Magboro | Plots from ₦5M"
        description="Discover Ileri Smart City in Magboro by Grandiose Homes. Secure your plot today with verified titles, smart infrastructure, and excellent ROI."
        schema={schema}
      />
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-lime-500" />
            <span className="text-sm font-black tracking-[0.2em] uppercase text-lime-500">Active Portfolio</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-8"
          >
            The Promised Land
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-forest-950/60 leading-relaxed max-w-2xl"
          >
            Explore our flagship developments designed for high-yield returns and sustainable living.
          </motion.p>
        </div>

        {/* Project 1: Ileri Smart City */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group overflow-hidden rounded-3xl luxury-shadow"
          >
            <img
              src="https://res.cloudinary.com/djfqa4llc/image/upload/f_webp,q_auto/v1771627326/zylushomespCwmqaAysDzk11-1024x575_st5g8r.jpg"
              alt="Ileri Smart City Magboro - Affordable Smart Cities Nigeria"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full luxury-shadow flex items-center gap-3">
                <span className="font-black uppercase tracking-widest text-xs text-forest-950">View Details</span>
                <ArrowRight size={16} className="text-lime-500" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-4xl font-serif font-black mb-4">Ileri Smart City</h2>
              <div className="flex items-center gap-2 text-forest-950/60 font-medium">
                <MapPin size={18} className="text-lime-500" />
                <span>Mountain Top University axis, Magboro</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl luxury-shadow border border-black/5">
                <p className="text-xs font-black uppercase tracking-widest text-forest-950/40 mb-2">Promo Price</p>
                <p className="text-2xl font-black text-lime-500">₦5M</p>
              </div>
              <div className="p-6 bg-white rounded-2xl luxury-shadow border border-black/5">
                <p className="text-xs font-black uppercase tracking-widest text-forest-950/40 mb-2">Actual Price</p>
                <p className="text-2xl font-black text-forest-950/40 line-through">₦7M</p>
              </div>
            </div>

            <div className="p-6 bg-forest-950 text-white rounded-2xl luxury-shadow">
              <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Plot Size</p>
              <p className="text-2xl font-black">500sqm</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-widest text-xs text-forest-950/40">Value Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "24/7 Security",
                  "Perimeter Fencing",
                  "Steady Power Supply",
                  "Lightning Control System"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-forest-950/70">
                    <CheckCircle2 size={16} className="text-lime-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Asset */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-3xl luxury-shadow h-[500px]"
        >
          <img
            src="https://res.cloudinary.com/djfqa4llc/image/upload/f_webp,q_auto/v1771627414/661e39652a6cb7ab105b3bc5cdb31510a25d98f7_kf3lqa.jpg"
            alt="Luxury Real Estate Nigeria - The Dream Realized"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full luxury-shadow flex items-center gap-3">
              <span className="font-black uppercase tracking-widest text-xs text-forest-950">View Details</span>
              <ArrowRight size={16} className="text-lime-500" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-12">
            <h3 className="text-3xl font-serif font-black text-white mb-4">The Dream Realized</h3>
            <p className="text-white/70 max-w-lg">Experience the pinnacle of luxury living with our upcoming developments in the heart of Lagos.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
