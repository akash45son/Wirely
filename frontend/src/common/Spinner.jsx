const Spinner = ({
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

      <p className="mt-4 text-gray-600">
        {text}
      </p>
    </div>
  );
};

export default Spinner;