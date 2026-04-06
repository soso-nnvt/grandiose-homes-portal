import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { 
  MapPin, Bed, Bath, ArrowLeft, Send, Car, Key, Trees, Wallet, 
  Armchair, Layout, Calendar, Info, Star, Compass, Coins, User, 
  Hash, Shield, Globe, CheckCircle2
} from 'lucide-react';
import { formatPropertyPrice } from '../lib/utils';
import { Skeleton } from '../components/Skeleton';

interface Property {
  id: number;
  slug: string;
  title: string;
  content: string;
  description?: string;
  price: string;
  price_actual?: number;
  price_formatted?: string;
  price_qualifier?: string;
  currency?: string;
  rent_frequency?: string;
  deposit?: string;
  council_tax_band?: string;
  bedrooms: number;
  bathrooms: number;
  reception_rooms?: number;
  property_type?: string;
  tenure?: string;
  address: string;
  address_street?: string;
  address_two?: string;
  address_three?: string;
  address_four?: string;
  address_postcode?: string;
  address_country?: string;
  latitude?: string;
  longitude?: string;
  image: string;
  gallery: string[];
  features?: string[];
  virtual_tour: string;
  status: string;
  availability?: string;
  parking?: string;
  outside_space?: string;
  furnished?: string;
  on_market?: string;
  available_date?: string;
  sale_by?: string;
  marketing_flag?: string;
  reference_number?: string;
  negotiator?: {
    name: string;
    email: string;
  };
}

function PropertyDetailSkeleton() {
  return (
    <div className="container mx-auto px-6 pt-32 pb-24">
      <div className="mb-12">
        <Skeleton className="w-32 h-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <Skeleton className="w-full h-[500px] mb-12" />
          <div className="grid grid-cols-4 gap-4 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="mb-12">
            <div className="flex gap-4 mb-6">
              <Skeleton className="w-24 h-6 rounded-full" />
              <Skeleton className="w-24 h-6 rounded-full" />
            </div>
            <Skeleton className="w-3/4 h-16 mb-8" />
            <div className="flex gap-8 mb-12">
              <Skeleton className="w-40 h-6" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
            <div className="flex gap-4 mb-12">
              <Skeleton className="w-48 h-12" />
              <Skeleton className="w-24 h-8" />
            </div>
            <div className="space-y-4 mb-12">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-8 luxury-shadow border border-black/5">
            <Skeleton className="w-1/2 h-8 mb-8" />
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="w-24 h-3 mb-2" />
                  <Skeleton className="w-full h-12" />
                </div>
              ))}
              <Skeleton className="w-full h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
        // Fetch from the Netlify function bridge
        const response = await fetch(`/.netlify/functions/get-single-property?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch property details');
        }
        
        // The API returns the mapped property directly
        setProperty(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        // Artificial delay for smoother transition
        setTimeout(() => setLoading(false), 800);
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

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.main 
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-ivory"
        >
          <PropertyDetailSkeleton />
        </motion.main>
      ) : error || !property ? (
        <motion.div 
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex items-center justify-center bg-ivory"
        >
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
        </motion.div>
      ) : (
        <motion.main 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-ivory text-forest-950 pt-32 pb-24"
        >
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
              <div className="flex items-center gap-4 mb-4">
                {property.marketing_flag && (
                  <span className="bg-forest-950 text-lime-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Star size={12} fill="currentColor" />
                    {property.marketing_flag}
                  </span>
                )}
                {property.property_type && (
                  <span className="bg-lime-500/10 text-lime-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    {property.property_type}
                  </span>
                )}
              </div>
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
              <div className="flex items-baseline gap-2 mb-12">
                <div className="text-4xl font-black text-lime-500">
                  {formatPropertyPrice(property.price_actual, property.currency, property.rent_frequency)}
                </div>
                {property.price_qualifier && (
                  <div className="text-forest-950/40 text-sm font-bold uppercase tracking-widest">
                    {property.price_qualifier}
                  </div>
                )}
              </div>
              
              <div className="prose prose-lg max-w-none text-forest-950/70 leading-relaxed mb-12">
                <div dangerouslySetInnerHTML={{ __html: property.description || property.content }} />
              </div>

              {/* Property Highlights */}
              {property.features && property.features.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-serif font-black mb-6">Property Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-forest-950/70 font-bold">
                        <CheckCircle2 size={18} className="text-lime-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Specifications Bento Grid */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-black mb-8">Property Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Tenure", value: property.tenure, icon: Key },
                    { label: "Parking", value: property.parking, icon: Car },
                    { label: "Outside Space", value: property.outside_space, icon: Trees },
                    { label: "Furnished", value: property.furnished, icon: Armchair },
                    { label: "Reception Rooms", value: property.reception_rooms, icon: Layout },
                    { label: "Deposit", value: property.deposit, icon: Wallet },
                    { label: "Available From", value: property.available_date, icon: Calendar },
                    { label: "On Market Since", value: property.on_market, icon: Info },
                    { label: "Council Tax", value: property.council_tax_band, icon: Shield },
                    { label: "Reference", value: property.reference_number, icon: Hash },
                    { label: "Sale By", value: property.sale_by, icon: User },
                    { label: "Currency", value: property.currency, icon: Coins },
                  ].filter(spec => spec.value && spec.value !== '0' && spec.value !== 0).map((spec, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl luxury-shadow border border-black/5 flex flex-col gap-4 hover:border-lime-500/30 transition-colors group">
                      <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center text-lime-500 group-hover:bg-lime-500 group-hover:text-forest-950 transition-all duration-500">
                        <spec.icon size={24} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-forest-950/40 mb-1">{spec.label}</span>
                        <span className="text-sm font-bold text-forest-950">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Details */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-black mb-6">Location & Address</h3>
                <div className="bg-white p-8 rounded-3xl luxury-shadow border border-black/5">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-ivory rounded-2xl flex items-center justify-center text-lime-500 flex-shrink-0">
                      <Compass size={32} />
                    </div>
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {[
                          { label: "Street", value: property.address_street },
                          { label: "Area", value: property.address_two },
                          { label: "City", value: property.address_three },
                          { label: "County", value: property.address_four },
                          { label: "Postcode", value: property.address_postcode },
                          { label: "Country", value: property.address_country },
                        ].filter(item => item.value).map((item, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-forest-950/40 mb-1">{item.label}</span>
                            <span className="text-sm font-bold text-forest-950">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      {property.latitude && property.longitude && (
                        <div className="mt-8 pt-8 border-t border-black/5 flex items-center gap-4 text-xs font-bold text-forest-950/40">
                          <Globe size={14} />
                          Coordinates: {property.latitude}, {property.longitude}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Negotiator Info */}
              {property.negotiator && (
                <div className="mb-12">
                  <h3 className="text-2xl font-serif font-black mb-6">Your Consultant</h3>
                  <div className="bg-forest-950 p-8 rounded-3xl text-white flex items-center gap-6">
                    <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-forest-950">
                      <User size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-black">{property.negotiator.name}</h4>
                      <p className="text-white/60 text-sm font-bold mb-2">Property Consultant</p>
                      <a href={`mailto:${property.negotiator.email}`} className="text-lime-500 text-sm font-black uppercase tracking-widest hover:text-white transition-colors">
                        {property.negotiator.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

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
    </motion.main>
    )}
    </AnimatePresence>
  );
}
