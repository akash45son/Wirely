import { Zap, Recycle, Heart } from "lucide-react";

const HeroSection = ({ productCount }) => {
  return (
    <section className="mb-8 rounded-[16px] hero-graph-pattern px-8 py-9 text-white border border-primary/20 shadow-md">
      <div className="max-w-4xl relative z-10">
        
        {/* Sleek hardware tag badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-teal/10 px-3 py-1 text-xs font-bold text-accent-teal border border-accent-teal/20 mb-4 tracking-wider uppercase font-heading">
          <Zap size={12} className="fill-accent-teal animate-pulse" /> Re-energize Campus Hardware
        </span>

        {/* Branding header */}
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white m-0 font-heading">
          wirely<span className="text-accent-teal font-black">.</span>
        </h1>

        {/* Custom Tagline */}
        <p className="mt-1 text-base font-semibold tracking-wide text-white/90 font-heading">
          Where Electronics Live Again
        </p>

        <p className="mt-3 max-w-xl text-sm text-white/80 leading-relaxed font-sans">
          Revive pre-loved microcontrollers, sensors, cables, and laptops. Join a dedicated campus network swapping, selling, and keeping components out of landfills.
        </p>

        {/* Glassmorphic Stats Grid */}
        <div className="mt-6 flex flex-wrap gap-5">
          
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-[10px] transition duration-300 hover:bg-white/10 hover:border-white/15">
            <span className="text-2xl font-bold tracking-tight text-white font-heading">
              {productCount}
            </span>
            <div>
              <p className="text-xs font-bold text-white/90 uppercase tracking-wider font-heading">
                Active Listings
              </p>
              <p className="text-[10px] text-white/60">Live on campus</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-[10px] transition duration-300 hover:bg-white/10 hover:border-white/15">
            <span className="text-xl text-accent-teal shrink-0">
              <Recycle size={18} />
            </span>
            <div>
              <p className="text-xs font-bold text-white/90 uppercase tracking-wider font-heading">
                Circular Swaps
              </p>
              <p className="text-[10px] text-white/60">Direct peer trading</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-[10px] transition duration-300 hover:bg-white/10 hover:border-white/15">
            <span className="text-xl text-red-400 shrink-0">
              <Heart size={18} fill="currentColor" />
            </span>
            <div>
              <p className="text-xs font-bold text-white/90 uppercase tracking-wider font-heading">
                Sustainable Devs
              </p>
              <p className="text-[10px] text-white/60">Eco campus initiative</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Decorative circuitry visual lines inside hero background */}
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none select-none hidden md:block">
        <svg width="240" height="180" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 140 H180 L220 180" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M120 40 V100 L150 130" stroke="white" strokeWidth="1.5" />
          <circle cx="120" cy="40" r="4" fill="white" />
          <circle cx="220" cy="180" r="4" fill="white" />
          <circle cx="40" cy="140" r="4" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;