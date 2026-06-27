import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { Eye, Leaf } from "lucide-react";

const ProductCard = ({
  product,
  actionButton = null,
}) => {
  return (
    <div
      className={`overflow-hidden rounded-[16px] modern-card flex flex-col ${
        product.status === "Sold" ? "opacity-75" : ""
      }`}
    >
      <Link to={`/products/${product._id}`} className="block overflow-hidden relative group">
        <img
          src={
            product.images?.[0] ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={product.title}
          className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <Eye size={12} /> Quick View
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="space-y-3.5 p-4 text-left flex-grow flex flex-col justify-between">
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <StatusBadge status={product.status} />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {product.category?.name}
            </span>
          </div>

          <div>
            <Link to={`/products/${product._id}`}>
              <h3 className="line-clamp-1 text-sm font-bold text-gray-800 hover:text-primary transition duration-200 font-heading">
                {product.title}
              </h3>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <span className="rounded-[6px] bg-gray-50 border border-gray-150 px-2.5 py-0.5 text-[11px] font-semibold text-gray-500">
              {product.condition}
            </span>

            <span className="text-base font-extrabold text-primary font-heading">
              ₹{product.price}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-[10px] bg-primary-light/45 border border-primary/5 p-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-primary/75 flex items-center gap-1 uppercase tracking-wider">
              <Leaf size={11} className="fill-primary/20" /> Carbon Saved
            </span>
            <span className="text-xs font-extrabold text-primary font-heading">
              {product.carbonSaved} kg
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {product.status === "Sold" ? (
              <div className="w-full rounded-[8px] bg-gray-100 py-2 text-center text-xs font-semibold text-gray-450 border border-gray-200 cursor-not-allowed">
                Out of Stock
              </div>
            ) : (
              <Link
                to={`/products/${product._id}`}
                className="block w-full text-center rounded-[8px] bg-primary py-2 text-xs font-bold text-white transition hover:bg-primary-hover shadow-sm hover:shadow font-heading uppercase tracking-wider"
              >
                View Details
              </Link>
            )}

            {actionButton}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;