export default function Price({ price, discount, className = "" }) {
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? price * (1 - discount / 100)
    : price;

  return (
    <p className={`flex items-center gap-2 ${className}`}>
      <span
        className={hasDiscount ? "text-md line-through text-gray-600 dark:text-gray-400" : "text-lg font-bold"}
      >
        ${price.toFixed(2)}
      </span>
      {hasDiscount && (
        <span className="text-lg font-bold">
          ${discountedPrice.toFixed(2)}
        </span>
      )}
    </p>
  );
}
