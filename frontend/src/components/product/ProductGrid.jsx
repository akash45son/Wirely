import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="rounded-[12px] border border-dashed border-[#E0E0E0] bg-[#F5F5F5] p-12 text-center">
        <h2 className="text-xl font-bold text-[#1A1A1A]">
          No Products Found
        </h2>

        <p className="mt-2 text-sm text-gray-500 font-medium">
          Be the first student to list an electronic item.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          actionButton={product.actionButton}
        />
      ))}
    </div>
  );
};

export default ProductGrid;