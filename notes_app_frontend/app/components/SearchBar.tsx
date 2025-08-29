import { useEffect, useRef } from "react";

type Props = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ defaultValue, onChange, placeholder }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current && defaultValue !== undefined) {
      ref.current.value = defaultValue;
    }
  }, [defaultValue]);
  return (
    <div className="flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-2 shadow-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-500">
        <path
          fill="currentColor"
          d="m21.53 20.47l-3.66-3.66A8.96 8.96 0 0 0 19 11a9 9 0 1 0-9 9c2.22 0 4.26-.81 5.81-2.13l3.66 3.66zM4 11a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
        />
      </svg>
      <input
        ref={ref}
        type="search"
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        placeholder={placeholder ?? "Search notes..."}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
