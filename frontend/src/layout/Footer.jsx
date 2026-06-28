import { Link } from "react-router-dom";
import { Zap, Heart, Mail, MapPin, ShieldAlert, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-white pt-16 pb-8 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand details */}
        <div className="space-y-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-primary hover:opacity-90 font-heading"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-white shadow-md shadow-primary/20">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="tracking-tighter">wirely<span className="text-accent-teal font-extrabold">.</span></span>
          </Link>
          
          <p className="text-xs font-semibold text-accent-teal uppercase tracking-widest font-heading">
            Where Electronics Live Again
          </p>
          
          <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
            Wirely is the premier student-to-student marketplace for buying, selling, and reusing electronics. Reduce e-waste, save carbon, and build a greener campus community.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-primary tracking-wide text-xs uppercase">
            Marketplace
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary transition text-xs font-medium">
                Browse Hardware
              </Link>
            </li>
            <li>
              <Link to="/sell" className="text-gray-500 hover:text-primary transition text-xs font-medium">
                List an Item
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="text-gray-500 hover:text-primary transition text-xs font-medium">
                My Wishlist
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-gray-500 hover:text-primary transition text-xs font-medium">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources & Safety */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-primary tracking-wide text-xs uppercase">
            Community Guidelines
          </h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2 text-xs text-gray-500">
              <ShieldAlert size={14} className="text-accent-teal shrink-0 mt-0.5" />
              <span>Meet in public, lit campus areas.</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-500">
              <Award size={14} className="text-accent-teal shrink-0 mt-0.5" />
              <span>Verify electronic functions on delivery.</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-500">
              <Heart size={14} className="text-accent-teal shrink-0 mt-0.5" />
              <span>Keep hardware circular and green.</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Locations */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-primary tracking-wide text-xs uppercase">
            Campus Support
          </h4>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={14} className="text-primary shrink-0" />
              <span>AISSMS IOIT, Pune</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-500">
              <Mail size={14} className="text-primary shrink-0" />
              <span>akash.sonawanedev@gmail.com</span>
            </li>
            <li className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary border border-primary/10">
              🌱 Eco-Friendly Initiative
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
        <span>© {new Date().getFullYear()} wirely. All rights reserved.</span>
        <span className="flex items-center gap-1 bg-primary-light/35 border border-primary/5 px-2.5 py-1 rounded-[6px] text-primary">
          Made with <Heart size={12} className="text-red-500 fill-red-500" /> By AKASH for a Greener Tomorrow.
        </span>
      </div>
    </footer>
  );
};

export default Footer;