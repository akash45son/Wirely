import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import { registerUser } from "../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    year: "",
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

      await registerUser(formData);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-white text-left py-10">
      <div className="w-full max-w-md border border-[#E0E0E0]/60 rounded-[12px] p-8 bg-white shadow-sm">
        
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-3xl">🌱</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] mt-2 mb-1">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Join the sustainable campus electronics marketplace
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[6px] mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="e.g. Jane Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="e.g. student@campus.edu"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="space-y-1">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              WhatsApp Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="e.g. 9876543210"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-[8px] border border-[#E0E0E0] bg-white px-3.5 py-2 text-sm text-text-dark outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder-gray-400"
              pattern="[6-9]{1}[0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number"
              required
            />
          </div>

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Min 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Department"
              type="text"
              name="department"
              placeholder="e.g. CSE"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <Input
              label="Year of Study"
              type="number"
              name="year"
              placeholder="e.g. 2"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline font-heading"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;