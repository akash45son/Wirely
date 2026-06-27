import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext";
import StatusBadge from "../components/product/StatusBadge";
import WhatsAppButton from "../components/product/WhatsAppButton";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ImageGallery from "../components/product/ImageGallery";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import Button from "../common/Button";

import SustainabilityCard from "../components/product/SustainabilityCard";
import SellerCard from "../components/product/SellerCard";

import { getProductById } from "../services/productService";
import { addToWishlist } from "../services/wishlistService";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [message, setMessage] = useState(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const wishlistMutation = useMutation({
    mutationFn: addToWishlist,

    onSuccess: (data) => {
      setMessage({
        type: "success",
        message: data.message,
      });

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      setMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to add product to wishlist.",
      });
    },
  });

  if (isLoading) {
    return (
      <Spinner text="Loading product..." />
    );
  }

  if (isError) {
    return (
      <Alert
        type="error"
        message={error.message}
      />
    );
  }

  const { product } = data;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 text-left">
      {message && (
        <div className="mb-6">
          <Alert
            type={message.type}
            message={message.message}
          />
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Image Gallery (Sticky) */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <ImageGallery images={product.images} />
        </div>

        {/* Right Column: Details & Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <StatusBadge status={product.status} />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {product.category?.name}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight m-0">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary">
                ₹{product.price}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                • {product.views} views
              </span>
            </div>
          </div>

          <hr className="border-[#E0E0E0]/60" />

          {/* Condition and basic specifications */}
          <div className="bg-[#F5F5F5] border border-[#E0E0E0]/50 rounded-[8px] p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Condition</span>
              <span className="font-semibold text-gray-800 bg-white border border-[#E0E0E0]/50 px-2 py-0.5 rounded-[4px] text-xs">
                {product.condition}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Availability</span>
              <span className="font-semibold text-gray-850">{product.status}</span>
            </div>
          </div>

          {/* Core Action Buttons */}
          <div className="space-y-3">
            {user?._id === product.seller._id ? (
              <div className="rounded-[8px] border border-primary/20 bg-primary-light/50 p-4 text-center text-sm font-semibold text-primary">
                ✨ This is your own listing
              </div>
            ) : product.status === "Sold" ? (
              <div className="rounded-[6px] border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-750">
                🔴 This product has already been sold
              </div>
            ) : (
              <>
                {product.status === "Reserved" && (
                  <div className="rounded-[6px] border border-amber-200 bg-amber-50 p-3.5 text-center text-xs font-semibold text-amber-700">
                    🟡 This product is currently reserved by another buyer
                  </div>
                )}
                
                <WhatsAppButton
                  sellerName={product.seller.name}
                  phoneNumber={product.seller.phoneNumber}
                  productTitle={product.title}
                />
              </>
            )}

            {/* Wishlist toggle action */}
            <Button
              variant="secondary"
              onClick={() => wishlistMutation.mutate(product._id)}
              disabled={wishlistMutation.isPending}
              className="w-full flex items-center justify-center gap-1.5"
            >
              {wishlistMutation.isPending ? "Adding..." : "♡ Add to Wishlist"}
            </Button>
          </div>

          <hr className="border-[#E0E0E0]/60" />

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1A1A]">
              Description
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>
          </div>

          <hr className="border-[#E0E0E0]/60" />

          {/* Seller Card */}
          <SellerCard seller={product.seller} />

          {/* Sustainability Card */}
          <SustainabilityCard carbonSaved={product.carbonSaved} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;