import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";

import { getAllProducts } from "../services/productService";
import { getAllCategories } from "../services/categoryService";

import HeroSection from "../components/marketplace/HeroSection";
import SearchBar from "../components/marketplace/SearchBar";
import CategoryChips from "../components/marketplace/CategoryChips";
import useDebounce from "../hooks/useDebounce";
import ProductGrid from "../components/product/ProductGrid";

const HomePage = () => {
  // UI State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const debouncedSearch = useDebounce(search, 500);
  
  // Products Query
  const {
    data: productData,
    isLoading: productsLoading,
    isError: productsError,
    error,
  } = useQuery({
    queryKey: [
      "products",
      debouncedSearch,
      selectedCategory,
    ],
    queryFn: () =>
      getAllProducts({
        search: debouncedSearch,
        category: selectedCategory,
      }),
  });

  // Categories Query
  const {
    data: categoryData,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (productsLoading || categoriesLoading) {
    return (
      <div className="py-20 text-center text-lg font-medium text-gray-500">
        Loading Marketplace...
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="py-20 text-center text-red-600 font-semibold">
        {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Hero */}
      <HeroSection
        productCount={productData?.products?.length || 0}
      />

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
        
        {/* Mobile Filter Toggle */}
        <div className="w-full lg:hidden flex gap-2 mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex-1 flex items-center justify-center gap-2 rounded-[6px] border border-[#E0E0E0] bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
          >
            <SlidersHorizontal size={16} className="text-primary" />
            {showMobileFilters ? "Hide Filters" : "Show Filters & Search"}
          </button>
        </div>

        {/* Left Sidebar */}
        <aside
          className={`${
            showMobileFilters ? "block" : "hidden"
          } lg:block w-full lg:w-64 shrink-0 lg:sticky lg:top-24 bg-[#F5F5F5] border border-[#E0E0E0]/60 p-6 rounded-[12px] space-y-6`}
        >
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Search Products
            </h3>
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Arduino, sensors..."
            />
          </div>

          <hr className="border-[#E0E0E0]/60" />

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Filter by Category
            </h3>
            <CategoryChips
              categories={categoryData?.categories || []}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </aside>

        {/* Right Product Listings */}
        <section className="flex-grow w-full">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              Latest Listings
            </h2>
            <span className="text-xs font-medium text-gray-500">
              Showing {productData?.products?.length || 0} electronics
            </span>
          </div>

          <ProductGrid
            products={productData?.products || []}
          />
        </section>

      </div>
    </div>
  );
};

export default HomePage;