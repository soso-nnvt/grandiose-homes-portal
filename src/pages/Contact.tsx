import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export function Contact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="min-h-screen bg-ivory text-forest-950 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* Left Column - The "Zero-Leak" Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-12">
              <span className="text-lime-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Investor Trust Center</span>
              <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-6">
                Command <br /> Center
              </h1>
              <p className="text-xl text-forest-950/60 leading-relaxed">
                Direct access to our investment advisors. Secure your position in our next development.
              </p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className="block w-full bg-transparent border-0 border-b-2 border-forest-950/10 py-4 text-forest-950 placeholder-transparent focus:ring-0 focus:border-lime-500 transition-colors peer"
                    placeholder="Full Name"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-sm text-forest-950/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-forest-950/20 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-lime-500 uppercase tracking-widest font-bold"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="block w-full bg-transparent border-0 border-b-2 border-forest-950/10 py-4 text-forest-950 placeholder-transparent focus:ring-0 focus:border-lime-500 transition-colors peer"
                    placeholder="Email Address"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-sm text-forest-950/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-forest-950/20 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-lime-500 uppercase tracking-widest font-bold"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    className="block w-full bg-transparent border-0 border-b-2 border-forest-950/10 py-4 text-forest-950 placeholder-transparent focus:ring-0 focus:border-lime-500 transition-colors peer"
                    placeholder="Phone Number"
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-3.5 text-sm text-forest-950/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-forest-950/20 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-lime-500 uppercase tracking-widest font-bold"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 font-black uppercase tracking-widest overflow-hidden rounded-full transition-all duration-500 luxury-shadow ${
                  isHovered ? 'bg-red-600 text-white' : 'bg-lime-500 text-forest-950'
                }`}
              >
                <span className="relative z-10">Initiate Contact</span>
                <Send className={`relative z-10 w-5 h-5 transition-transform duration-500 ${isHovered ? 'translate-x-2' : ''}`} />
              </button>
            </form>
          </motion.div>

          {/* Right Column - Map & Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between h-full"
          >
            <div className="space-y-8">
              {/* Trust Proof Card */}
              <div className="bg-white p-8 rounded-3xl luxury-shadow border border-black/5 flex items-center gap-6">
                <div className="bg-lime-500/10 p-4 rounded-2xl">
                  <ShieldCheck className="text-lime-500 w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black mb-1">RC 1642680</h3>
                  <p className="text-forest-950/40 text-xs font-bold uppercase tracking-widest">Certified Real Estate Developer</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl luxury-shadow border border-black/5">
                <h3 className="text-2xl font-serif font-black mb-8">Lagos Headquarters</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-lime-500 shrink-0 mt-1" />
                    <div>
                      <p className="font-black mb-2 uppercase tracking-widest text-xs text-forest-950/40">Address</p>
                      <p className="text-forest-950/70 text-sm leading-relaxed font-bold">
                        110 Ipaja Road, Alimosho B/Stop, opposite Prestige Superstores, Iyana-Ipaja, Lagos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-lime-500 shrink-0" />
                    <div>
                      <p className="font-black mb-2 uppercase tracking-widest text-xs text-forest-950/40">Phone</p>
                      <p className="text-forest-950/70 text-sm font-bold">0704 612 6348</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-lime-500 shrink-0" />
                    <div>
                      <p className="font-black mb-2 uppercase tracking-widest text-xs text-forest-950/40">Email</p>
                      <p className="text-forest-950/70 text-sm font-bold">grandiosegroupng@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Asset */}
            <div className="relative w-full h-80 mt-8 rounded-3xl overflow-hidden luxury-shadow group">
              <img
                src="https://res.cloudinary.com/djfqa4llc/image/upload/v1771627143/Real-estate-developer-in-Lagos-1024x1024.png.bv.webp_imq0jf.webp"
                alt="Grandiose Team"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-forest-950/20 group-hover:opacity-0 transition-opacity duration-500" />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
