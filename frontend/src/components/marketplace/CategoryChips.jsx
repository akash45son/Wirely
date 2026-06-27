const CategoryChips = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <button
        onClick={() => onSelectCategory("")}
        className={`w-full text-left px-4 py-2.5 rounded-[6px] font-medium text-sm transition duration-200 cursor-pointer ${
          selectedCategory === ""
            ? "bg-primary text-white shadow-sm font-semibold"
            : "text-gray-700 hover:bg-white hover:text-primary hover:shadow-xs"
        }`}
      >
        All Products
      </button>

      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() =>
            onSelectCategory(category.name)
          }
          className={`w-full text-left px-4 py-2.5 rounded-[6px] font-medium text-sm transition duration-200 cursor-pointer ${
            selectedCategory === category.name
              ? "bg-primary text-white shadow-sm font-semibold"
              : "text-gray-700 hover:bg-white hover:text-primary hover:shadow-xs"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;