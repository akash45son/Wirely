import { Link } from "react-router-dom";
import {
  Cpu,
  Package,
  ShoppingBag,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

const ComponentCard = ({ component }) => {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <Cpu className="text-green-700" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {component.displayName}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            {component.purpose}
          </p>
        </div>

        {component.required ? (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold tracking-wide text-green-700">
            <CheckCircle size={13} />
            Required
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-semibold tracking-wide text-yellow-700">
            <XCircle size={13} />
            Optional
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gray-100" />

      {/* Products Section */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <ShoppingBag className="text-green-700" size={17} />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
            Available Products
          </h4>
        </div>

        {component.products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Package size={22} className="text-gray-400" />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-400">
              No seller has listed this component yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {component.products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-green-200 hover:bg-green-50"
              >
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">
                    {product.title}
                  </h5>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Sold by{" "}
                    <span className="font-medium text-gray-500">
                      {product.seller.name}
                    </span>
                  </p>
                  <p className="mt-1.5 text-base font-bold text-green-700">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <Link
                  to={`/products/${product._id}`}
                  className="ml-4 flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-800 hover:gap-2.5"
                >
                  View
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentCard;