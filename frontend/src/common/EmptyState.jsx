import { PackageOpen } from "lucide-react";

const EmptyState = ({
  title,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-dashed p-12 text-center">
      <PackageOpen
        className="mx-auto text-gray-400"
        size={64}
      />

      <h2 className="mt-6 text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;