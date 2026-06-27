
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import Spinner from "../common/Spinner";
import Alert from "../common/Alert";

import ProductForm from "../components/product/ProductForm";

import {
  getProductById,
  updateProduct,
} from "../services/productService";

import { getAllCategories } from "../services/categoryService";

const EditProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Load Product
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
    error: productErrorMessage,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // Load Categories
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
    error: categoryErrorMessage,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const mutation = useMutation({
    mutationFn: (formData) =>
      updateProduct(id, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        condition: formData.condition,
        category: formData.category,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", id],
      });

      navigate("/my-products");
    },
  });

  if (productLoading || categoryLoading) {
    return (
      <Spinner text="Loading product..." />
    );
  }

  if (productError) {
    return (
      <Alert
        type="error"
        message={productErrorMessage.message}
      />
    );
  }

  if (categoryError) {
    return (
      <Alert
        type="error"
        message={categoryErrorMessage.message}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-[#1A1A1A] text-left">
        Edit Product
      </h1>

      <ProductForm
        categories={categoryData.categories}
        initialValues={productData.product}
        submitButtonText="Update Product"
        onSubmit={mutation.mutate}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
};

export default EditProductPage;
