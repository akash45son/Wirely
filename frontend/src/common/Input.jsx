const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-[8px] border border-[#E0E0E0] bg-white px-3.5 py-2 text-sm text-text-dark outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:bg-gray-100 placeholder-gray-400"
      />
    </div>
  );
};

export default Input;