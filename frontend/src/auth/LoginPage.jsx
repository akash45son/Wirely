import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setIsSubmitting(true);

      const data = await loginUser(formData);

      await login(data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed"; 
      setError(message); 
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white text-left">
      <div className="w-full max-w-md border border-[#E0E0E0]/60 rounded-[12px] p-8 bg-white shadow-sm">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-3xl">🌱</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] mt-2 mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Login to trade electronics on your campus
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[6px] mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. student@campus.edu"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Logging in..." : "Login to Account"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 font-medium">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline font-heading"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;