import { Leaf, Recycle, Trees } from "lucide-react";

const SustainabilityCard = ({ carbonSaved }) => {
  const treesEquivalent = (carbonSaved / 10).toFixed(2);
  const carTravelAvoided = (carbonSaved * 5).toFixed(2);

  return (
    <div className="rounded-[16px] border border-primary/10 bg-primary-light/20 p-6 text-left">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-primary text-white shadow-sm">
          <Leaf size={18} fill="currentColor" />
        </div>
        <h2 className="text-lg font-bold text-primary font-heading">
          Sustainability Impact
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        
        <div className="rounded-[12px] bg-white border border-primary/5 p-4 text-center shadow-xs transition hover:shadow-sm">
          <Leaf className="mx-auto mb-2 text-primary" size={24} />
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Carbon Saved
          </p>
          <p className="text-base font-bold text-primary font-heading">
            {carbonSaved} kg
          </p>
        </div>

        <div className="rounded-[12px] bg-white border border-primary/5 p-4 text-center shadow-xs transition hover:shadow-sm">
          <Trees className="mx-auto mb-2 text-primary" size={24} />
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Trees Equivalent
          </p>
          <p className="text-base font-bold text-primary font-heading">
            {treesEquivalent}
          </p>
        </div>

        <div className="rounded-[12px] bg-white border border-primary/5 p-4 text-center shadow-xs transition hover:shadow-sm">
          <Recycle className="mx-auto mb-2 text-primary" size={24} />
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Car Travel Avoided
          </p>
          <p className="text-base font-bold text-primary font-heading">
            {carTravelAvoided} km
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default SustainabilityCard;