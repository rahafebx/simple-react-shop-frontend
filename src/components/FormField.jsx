export default function FormField({
  label,
  id,
  type = "text",
  placeholder,
  error,
  registration,
  defaultValue,
  rows,
}) {
  const inputClass = `block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 ${
    error
      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
  }`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={inputClass.replace("h-12", rows ? `h-${rows * 8}` : "h-24")}
          {...registration}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={inputClass}
          {...registration}
        />
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
