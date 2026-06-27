import api from "./api";

export const getDashboardStats =
  async () => {
    const response = await api.get(
      "/users/dashboard"
    );

    return response.data;
  };