const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  required = false,
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

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full rounded-[8px] border border-[#E0E0E0] bg-white px-3.5 py-2 text-sm text-text-dark outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder-gray-400"
      />
    </div>
  );
};

export default TextArea;