import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";
import StatusSelector from "../components/product/StatusSelector";
import ProductGrid from "../components/product/ProductGrid";

import { useNavigate } from "react-router-dom";


import {
  getMyProducts,
  deleteProduct,
  updateProductStatus,
} from "../services/productService";

const MyProductsPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-products"],
    queryFn: getMyProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });


const statusMutation = useMutation({
  mutationFn: ({ productId, status }) =>
    updateProductStatus(productId, status),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["my-products"],
    });

    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    queryClient.invalidateQueries({
      queryKey: ["dashboard"],
    });
  },
});



  if (isLoading) {
    return (
      <Spinner text="Loading your products..." />
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

  if (data.products.length === 0) {
    return (
      <EmptyState
        title="No Products Listed"
        description="Start by listing your first product."
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-[#1A1A1A] text-left">
        My Products
      </h1>

      <ProductGrid
        products={data.products.map((product) => ({
          ...product,
          
          actionButton: (
            <div className="space-y-3 pt-2">
              <StatusSelector
                value={product.status}
                onChange={(status) =>
                  statusMutation.mutate({
                    productId: product._id,
                    status,
                  })
                }
              />

              <Button
                variant="secondary"
                onClick={() =>
                  navigate(`/products/edit/${product._id}`)
                }
              >
                Edit Product
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  const confirmed = window.confirm(
                    `Delete "${product.title}"?`
                  );

                  if (confirmed) {
                    deleteMutation.mutate(product._id);
                  }
                }}
              >
                Delete Product
              </Button>
            </div>
          ),
        }))}
      />
    </div>
  );
};

export default MyProductsPage;