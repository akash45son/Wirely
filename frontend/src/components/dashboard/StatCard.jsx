const StatCard = ({
  title,
  value,
  unit = "",
  icon,
}) => {
  return (
    <div className="rounded-[16px] border border-primary/10 bg-white p-6 shadow-sm text-left hover:shadow-md transition duration-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-heading">
          {title}
        </h3>

        <div className="p-2 rounded-[8px] bg-primary-light/50 border border-primary/5 text-primary">
          {icon}
        </div>
      </div>

      <h2 className="text-3xl font-extrabold tracking-tight text-primary m-0 font-heading">
        {value}
        {unit && (
          <span className="ml-1 text-sm font-medium text-gray-500 font-sans">
            {unit}
          </span>
        )}
      </h2>
    </div>
  );
};

export default StatCard;