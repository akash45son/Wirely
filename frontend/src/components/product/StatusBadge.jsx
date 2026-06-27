const statusStyles = {
  Available:
    "bg-primary-light text-primary border-primary/20",

  Reserved:
    "bg-amber-50 text-amber-700 border-amber-200",

  Sold:
    "bg-red-50 text-red-700 border-red-250",
};

const statusIcons = {
  Available: "●",
  Reserved: "●",
  Sold: "●",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        statusStyles[status]
      }`}
    >
      <span className="text-[10px]">{statusIcons[status]}</span>
      {status}
    </span>
  );
};

export default StatusBadge;