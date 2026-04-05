import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { MapPin, Bed, ArrowRight } from 'lucide-react';
import { mapWPProperty } from '../lib/wp-mapper';

interface Property {
  id: number;
  slug: string;
  title: string;
  price: string;
  bedrooms: number;
  address: string;
  image: string;
  status: string;
  property_type?: string;
  availability?: string;
}

export function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        // Fetch from the Express API bridge
        const response = await fetch('/api/properties');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch properties');
        }
        
        // The API now returns mapped data directly
        setProperties(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-black text-forest-950 mb-4">Error Loading Properties</h2>
          <p className="text-forest-950/60">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ivory text-forest-950 pt-32 pb-24">
      <SEO 
        title="Available Properties | Grandiose Homes"
        description="Explore our exclusive collection of luxury properties and smart city plots in Nigeria."
      />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-lime-500" />
            <span className="text-sm font-black tracking-[0.2em] uppercase text-lime-500">Property Portfolio</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-8"
          >
            Find Your Dream Home
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden luxury-shadow border border-black/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image || 'https://picsum.photos/seed/property/800/600'}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-lime-500 text-forest-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {property.availability || property.status}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-forest-950/40 text-xs font-bold uppercase tracking-widest">
                    <MapPin size={14} className="text-lime-500" />
                    {property.address}
                  </div>
                  {property.property_type && (
                    <span className="text-[10px] font-black uppercase tracking-widest bg-forest-950/5 px-2 py-0.5 rounded text-forest-950/40">
                      {property.property_type}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-black mb-4 group-hover:text-lime-500 transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-forest-950/60">
                      <Bed size={18} />
                      <span className="text-sm font-bold">{property.bedrooms}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-lime-500">
                    {property.price}
                  </div>
                </div>
                <Link
                  to={`/properties/${property.id}`}
                  className="inline-flex items-center gap-2 text-forest-950 font-black uppercase tracking-widest text-xs group/link"
                >
                  <span>View Details</span>
                  <ArrowRight size={16} className="text-lime-500 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-24">
            <p className="text-forest-950/40 font-bold uppercase tracking-widest">No properties found at this time.</p>
          </div>
        )}
      </div>
    </main>
  );
}
