import { Mail, GraduationCap, User } from "lucide-react";

const SellerCard = ({ seller }) => {
  return (
    <div className="rounded-[16px] border border-primary/10 bg-white p-6 shadow-sm text-left">
      <h2 className="mb-5 text-lg font-bold text-primary font-heading">
        Seller Information
      </h2>

      <div className="space-y-4">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[8px] bg-primary-light/50 border border-primary/5 text-primary">
            <User size={18} />
          </div>
          <span className="text-sm font-semibold text-gray-700">{seller.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[8px] bg-primary-light/50 border border-primary/5 text-primary">
            <Mail size={18} />
          </div>
          <span className="text-sm font-medium text-gray-600">{seller.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[8px] bg-primary-light/50 border border-primary/5 text-primary">
            <GraduationCap size={18} />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {seller.department} • Year {seller.year}
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default SellerCard;