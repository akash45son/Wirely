import api from "./api";

export const getAllProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  
  return response.data;
};

export const uploadProductImages = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post(
    "/products/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const createProduct = async (
  productData
) => {
  const response = await api.post(
    "/products",
    productData
  );

  return response.data;
};

export const getMyProducts = async () => {
  const response = await api.get(
    "/users/my-products"
  );

  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete(
    `/products/${productId}`
  );

  return response.data;
};


export const updateProduct = async (
  productId,
  productData
) => {
  const response = await api.put(
    `/products/${productId}`,
    productData
  );

  return response.data;
};

export const updateProductStatus =
  async (productId, status) => {
    const response = await api.put(
      `/products/${productId}`,
      { status }
    );

    return response.data;
  };

