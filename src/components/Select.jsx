import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";

function Select({
  options,
  value,
  onChange,
  getLabel,
  getValue,
  placeholder = "Select...",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find(
    (option) => getValue(option) === value
  );

  return (
    <div
      ref={ref}
      className={`relative w-64 ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-left text-zinc-100 transition hover:border-amber-500 focus:outline-none"
      >
        <span>
          {selected
            ? getLabel(selected)
            : placeholder}
        </span>

        <KeyboardArrowDownIcon
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fontSize="small"
        />
      </button>

      <div
        className={`absolute left-0 right-0 z-50 mt-2 origin-top overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl transition-all duration-200 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {options.map((option) => {
          const selected =
            getValue(option) === value;

          return (
            <button
              key={getValue(option)}
              type="button"
              onClick={() => {
                onChange(getValue(option));
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                selected
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span>{getLabel(option)}</span>

              {selected && (
                <CheckIcon fontSize="small" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Select;