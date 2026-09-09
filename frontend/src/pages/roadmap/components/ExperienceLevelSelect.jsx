import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const ExperienceLevelSelect = ({
  value,
  onChange,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const options = [
    {
      value: "BEGINNER",
      label: "Beginner",
    },
    {
      value: "INTERMEDIATE",
      label: "Intermediate",
    },
    {
      value: "ADVANCED",
      label: "Advanced",
    },
  ];

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-w-0"
    >
      <button
        id="experienceLevel"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm outline-none transition focus:ring-2 dark:bg-slate-900 ${
          error
            ? "border-red-500 focus:ring-red-500/20"
            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700"
        }`}
      >
        <span
          className={
            selectedOption
              ? "truncate text-slate-900 dark:text-white"
              : "truncate text-slate-400 dark:text-slate-500"
          }
        >
          {selectedOption?.label ||
            "Select experience level"}
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Experience Level"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {options.map((option) => {
            const selected =
              value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() =>
                  handleSelect(option)
                }
                className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                  selected
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <span className="truncate">
                  {option.label}
                </span>

                {selected && (
                  <Check
                    size={17}
                    className="shrink-0"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExperienceLevelSelect;