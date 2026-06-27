import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import AuthProvider from "./context/AuthContext";

import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        
<AuthProvider>
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        borderRadius: "12px",
        background: "#fff",
        color: "#111827",
      },
      success: {
        iconTheme: {
          primary: "#16a34a",
          secondary: "#fff",
        },
      },
      error: {
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fff",
        },
      },
    }}
  />

  <App />
</AuthProvider>


      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);