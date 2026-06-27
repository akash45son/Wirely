import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import AddProductPage from "../pages/AddProductPage";

import HomePage from "../marketplace/HomePage";
import ProductDetailsPage from "../marketplace/ProductDetailsPage";
import WishlistPage from "../marketplace/WishlistPage";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";

import DashboardPage from "../dashboard/DashboardPage";
import MyProductsPage from "../dashboard/MyProductsPage";

import ProtectedRoute from "./ProtectedRoute";

import EditProductPage from "../dashboard/EditProductPage";



const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/products/:id"
          element={<ProductDetailsPage />}
        />

        {/* Protected Routes */}

        <Route
  path="/sell"
  element={
    <ProtectedRoute>
      <AddProductPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

          <Route
  path="/products/:id"
  element={<ProductDetailsPage />}
/>

        <Route
          path="/my-products"
          element={
            <ProtectedRoute>
              <MyProductsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
  path="/products/edit/:id"
  element={
    <ProtectedRoute>
      <EditProductPage />
    </ProtectedRoute>
  }
/>

      {/* Auth Routes */}

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/register"
        element={<RegisterPage />}
      />
    </Routes>
  );
};

export default AppRoutes;