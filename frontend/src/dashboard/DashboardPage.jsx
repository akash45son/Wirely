import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Leaf,
  Trophy,
  Recycle,
  Car,
  Trees,
  Package,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import Spinner from "../common/Spinner";
import Alert from "../common/Alert";

import StatCard from "../components/dashboard/StatCard";

import { getDashboardStats } from "../services/dashboardService";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <Spinner text="Loading dashboard..." />
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

  const stats = data;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 text-left">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
          Welcome, {user?.name} 👋
        </h1>

        <p className="mt-2 text-sm text-gray-500 font-medium">
          Here's your sustainability impact.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Carbon Saved"
          value={stats.totalCarbonSaved}
          unit="kg"
          icon={<Leaf size={24} />}
        />

        <StatCard
          title="Sustainability Score"
          value={stats.sustainabilityScore}
          icon={<Trophy size={24} />}
        />

        <StatCard
          title="E-Waste Prevented"
          value={stats.eWastePrevented}
          unit="items"
          icon={<Recycle size={24} />}
        />

        <StatCard
          title="Car Travel Avoided"
          value={stats.carTravelAvoidedKm}
          unit="km"
          icon={<Car size={24} />}
        />

        <StatCard
          title="Trees Equivalent"
          value={stats.treesEquivalent}
          icon={<Trees size={24} />}
        />

        <StatCard
          title="Products Listed"
          value={stats.productsListed}
          icon={<Package size={24} />}
        />
      </div>

      {/* Top Category */}
      <div className="mt-8 rounded-[16px] border border-primary/10 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 font-heading">
          Top Sustainable Category
        </h2>

        <p className="text-2xl font-extrabold text-primary m-0 font-heading">
          {stats.topSustainableCategory}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;