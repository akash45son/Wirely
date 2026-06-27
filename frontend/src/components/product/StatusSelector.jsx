
const StatusSelector = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-1 text-left">
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
        Product Status
      </label>
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-[8px] border border-[#E0E0E0] bg-white px-3 py-2 text-sm text-text-dark outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
      >
        <option value="Available">
          🟢 Available
        </option>

        <option value="Reserved">
          🟡 Reserved
        </option>

        <option value="Sold">
          🔴 Sold
        </option>
      </select>
    </div>
  );
};

export default StatusSelector;
