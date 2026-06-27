const Alert = ({
  type = "success",
  message,
}) => {
  const styles = {
    success:
      "bg-green-100 text-green-700 border-green-300",

    error:
      "bg-red-100 text-red-700 border-red-300",

    warning:
      "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <div
      className={`rounded-lg border p-4 ${styles[type]}`}
    >
      {message}
    </div>
  );
};

export default Alert;