import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search electronics...",
}) => {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-[8px] border border-[#E0E0E0]/80 bg-white py-2.5 pl-10 pr-4 text-sm text-text-dark outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;