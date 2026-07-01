import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrainCircuit, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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

      
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl overflow-hidden">

  {/* Top accent bar */}
  <div className="h-1.5 w-full bg-green-800" />

  <div className="p-8">
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
            <BrainCircuit size={24} className="text-green-800" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-800">
              Powered by AI
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              AI Project Builder
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gray-100" />

        {/* Description */}
        <p className="max-w-2xl text-sm leading-7 text-gray-500">
          Describe the electronics project you want to build. AI will
          generate the required components and instantly show which
          ones are available on EcoTrade Campus.
        </p>

        {/* CTA */}
        <Link
          to="/ai-project-builder"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-900 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-800 hover:gap-3"
        >
          Open AI Builder
          <ArrowRight size={15} />
        </Link>

      </div>
    </div>
  </div>
</div>
    </div>
    
  );
};

export default DashboardPage;