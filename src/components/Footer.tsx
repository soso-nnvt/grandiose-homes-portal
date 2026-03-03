import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white text-forest-950 py-16 border-t border-black/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <img
              src="https://res.cloudinary.com/djfqa4llc/image/upload/v1772541880/grandiose1_hoaxso.png"
              alt="Grandiose Homes"
              className="h-10 w-auto mb-6"
              referrerPolicy="no-referrer"
            />
            <p className="text-sm text-forest-950/60 leading-relaxed">
              Leading the way in sustainable and smart real estate developments across Nigeria. RC 1642680.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-forest-950/40">Navigation</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link to="/" className="inline-block py-2 hover:text-lime-500 transition-colors min-h-[44px] flex items-center">Home</Link></li>
                <li><Link to="/projects" className="inline-block py-2 hover:text-lime-500 transition-colors min-h-[44px] flex items-center">Projects</Link></li>
                <li><Link to="/vault" className="inline-block py-2 hover:text-lime-500 transition-colors min-h-[44px] flex items-center">Vault</Link></li>
                <li><Link to="/contact" className="inline-block py-2 hover:text-lime-500 transition-colors min-h-[44px] flex items-center">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-forest-950/40">Contact</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li className="py-2 min-h-[44px] flex items-center">0704 612 6348</li>
                <li className="py-2 min-h-[44px] flex items-center">grandiosegroupng@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-forest-950/30">
          <p>&copy; {new Date().getFullYear()} Grandiose Homes & Investment Limited.</p>
          <p className="font-display tracking-[0.2em] uppercase text-[10px] font-medium text-forest-950/50">Powered by Netnovatelabs</p>
        </div>
      </div>
    </footer>
  );
}
