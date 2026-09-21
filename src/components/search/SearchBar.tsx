"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { debounce } from "@/lib/utils/helpers";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search items...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [local, setLocal] = useState(value);

  const debouncedChange = useMemo(() => debounce(onChange, 350), [onChange]);

  useEffect(() => {
    debouncedChange(local);
  }, [local, debouncedChange]);

  // sync from parent if it changes externally (e.g. URL params)
  useEffect(() => { setLocal(value); }, [value]);

  return (
    <div className="relative">
      <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-10 pr-9"
      />
      {local && (
        <button
          onClick={() => { setLocal(""); onChange(""); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
