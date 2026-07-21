export function Input({
  type = "text",
  placeholder,
  startIcon,
  endIcon,
  className = "",
  ...props
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-all duration-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 ${className}`}
    >
      {startIcon && (
        <span className="text-zinc-400">
          {startIcon}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 outline-none"
        {...props}
      />

      {endIcon && (
        <span className="text-zinc-400">
          {endIcon}
        </span>
      )}
    </div>
  );
}