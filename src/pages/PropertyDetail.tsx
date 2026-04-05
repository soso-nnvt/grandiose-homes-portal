import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { MapPin, Bed, Bath, ArrowLeft, Send } from 'lucide-react';
import { mapWPProperty } from '../lib/wp-mapper';

interface Property {
  id: number;
  slug: string;
  title: string;
  content: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  image: string;
  gallery: string[];
  virtual_tour: string;
  status: string;
}

export function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        // Fetch from the Express API bridge
        const response = await fetch(`/api/properties?include=${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch property details');
        }
        
        // The API returns an array even for single ID request
        const propertyData = Array.isArray(data) ? data[0] : data;
        if (!propertyData) throw new Error('Property not found');

        setProperty(propertyData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProperty();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      property_id: id,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit enquiry');
      setSuccess(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <h2 className="text-4xl font-serif font-black text-forest-950 mb-4">{error || 'Property Not Found'}</h2>
          <button 
            onClick={() => navigate('/properties')}
            className="inline-flex items-center gap-2 text-lime-500 font-black uppercase tracking-widest text-sm"
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ivory text-forest-950 pt-32 pb-24">
      <SEO 
        title={`${property.title} | Grandiose Homes`}
        description={`Detailed view of ${property.title}. Price: ${property.price}. Located in ${property.address}.`}
      />
      <div className="container mx-auto px-6">
        <button 
          onClick={() => navigate('/properties')}
          className="inline-flex items-center gap-2 text-forest-950/40 hover:text-lime-500 transition-colors font-black uppercase tracking-widest text-xs mb-12"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl overflow-hidden luxury-shadow mb-12 h-[500px]"
            >
              <img
                src={property.image || 'https://picsum.photos/seed/property/1200/800'}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-4 mb-12">
              {property.gallery.map((img, i) => (
                <div key={i} className="h-24 rounded-2xl overflow-hidden luxury-shadow border border-black/5">
                  <img src={img} alt={`${property.title} gallery ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>

            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-serif font-black mb-6">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-forest-950/60 font-bold">
                  <MapPin size={20} className="text-lime-500" />
                  {property.address}
                </div>
                <div className="flex items-center gap-2 text-forest-950/60 font-bold">
                  <Bed size={20} className="text-lime-500" />
                  {property.bedrooms} Bedrooms
                </div>
                <div className="flex items-center gap-2 text-forest-950/60 font-bold">
                  <Bath size={20} className="text-lime-500" />
                  {property.bathrooms} Bathrooms
                </div>
              </div>
              <div className="text-4xl font-black text-lime-500 mb-12">{property.price}</div>
              
              <div className="prose prose-lg max-w-none text-forest-950/70 leading-relaxed mb-12">
                <div dangerouslySetInnerHTML={{ __html: property.content }} />
              </div>

              {property.virtual_tour && (
                <div className="mb-12">
                  <h3 className="text-2xl font-serif font-black mb-6">Virtual Tour</h3>
                  <div className="aspect-video rounded-3xl overflow-hidden luxury-shadow bg-black">
                    <iframe 
                      src={property.virtual_tour} 
                      className="w-full h-full" 
                      allowFullScreen 
                      title="Virtual Tour"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="bg-white rounded-3xl p-8 luxury-shadow border border-black/5">
                <h3 className="text-2xl font-serif font-black mb-6">Enquire Now</h3>
                {success ? (
                  <div className="bg-lime-500/10 p-6 rounded-2xl text-center">
                    <p className="text-forest-950 font-bold mb-2">Thank You!</p>
                    <p className="text-forest-950/60 text-sm">Your enquiry has been sent. A consultant will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-forest-950/40 mb-2">Full Name</label>
                      <input name="name" type="text" required className="w-full px-6 py-4 bg-ivory rounded-2xl border border-black/5 focus:outline-none focus:border-lime-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-forest-950/40 mb-2">Email Address</label>
                      <input name="email" type="email" required className="w-full px-6 py-4 bg-ivory rounded-2xl border border-black/5 focus:outline-none focus:border-lime-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-forest-950/40 mb-2">Phone Number</label>
                      <input name="phone" type="tel" required className="w-full px-6 py-4 bg-ivory rounded-2xl border border-black/5 focus:outline-none focus:border-lime-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-forest-950/40 mb-2">Message</label>
                      <textarea name="message" rows={4} className="w-full px-6 py-4 bg-ivory rounded-2xl border border-black/5 focus:outline-none focus:border-lime-500 transition-colors resize-none"></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full py-5 bg-lime-500 text-forest-950 font-black uppercase tracking-widest rounded-2xl hover:bg-lime-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? 'Sending...' : 'Send Enquiry'}
                      <Send size={18} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
