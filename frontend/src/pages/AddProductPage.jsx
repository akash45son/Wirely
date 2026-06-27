import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import ProductForm from "../components/product/ProductForm";

import { getAllCategories } from "../services/categoryService";
import {
  uploadProductImages,
  createProduct,
} from "../services/productService";

const AddProductPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      setErrorMessage("");
      setSuccessMessage("");

      // Upload Images
      const uploadResponse =
        await uploadProductImages(formData.files);

      // Create Product
      return createProduct({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        condition: formData.condition,
        category: formData.category,
        images: uploadResponse.imageUrls,
      });
    },

    onSuccess: async () => {
      setSuccessMessage(
        "Product created successfully!"
      );

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },

    onError: (error) => {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong."
      );
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 text-left">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-[#1A1A1A] text-left">
        Sell Your Product
      </h1>

      {successMessage && (
        <div className="mb-6 rounded-[8px] border border-primary/20 bg-primary-light/50 p-4 text-sm font-semibold text-primary">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 rounded-[6px] border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-705">
          {errorMessage}
        </div>
      )}

      <ProductForm
        categories={data.categories}
        onSubmit={mutation.mutate}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
};

export default AddProductPage;