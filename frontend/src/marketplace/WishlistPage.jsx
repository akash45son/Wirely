import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";

import ProductGrid from "../components/product/ProductGrid";

import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const WishlistPage = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  if (isLoading) {
    return (
      <Spinner text="Loading wishlist..." />
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

  if (data.wishlist.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is Empty"
        description="Save products you like to view them later."
      />
    );
  }

  const products = data.wishlist.map((product) => ({
    ...product,

    actionButton: (
      <Button
        onClick={() =>
          removeMutation.mutate(product._id)
        }
      >
        Remove
      </Button>
    ),
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-[#1A1A1A] text-left">
        My Wishlist
      </h1>

      <ProductGrid products={products} />
    </div>
  );
};

export default WishlistPage;