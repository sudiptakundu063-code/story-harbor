export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-amber-500 text-zinc-950 hover:bg-amber-400 active:bg-amber-600",

    secondary:
      "border border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-amber-500 hover:text-amber-400",

    ghost:
      "bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-amber-400",

    danger:
      "bg-red-600 text-white hover:bg-red-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}