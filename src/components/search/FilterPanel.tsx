"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, STATUS_CONFIG } from "@/lib/utils/helpers";
import type { ItemFilters, ItemCategory, ItemStatus, ItemType } from "@/types";
import Button from "../ui/Button";

export default function FilterPanel({
  filters,
  onChange,
}: {
  filters: ItemFilters;
  onChange: (filters: ItemFilters) => void;
}) {
  const [open, setOpen] = useState(false);

  const set = (patch: Partial<ItemFilters>) => onChange({ ...filters, ...patch, page: 1 });
  const clear = () => onChange({ page: 1 });

  const activeCount = [filters.type, filters.status, filters.category, filters.location]
    .filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-text">
              {activeCount}
            </span>
          )}
        </button>

        {/* quick type toggles */}
        <div className="flex gap-1">
          {(["lost", "found"] as ItemType[]).map((t) => (
            <button
              key={t}
              onClick={() => set({ type: filters.type === t ? undefined : t })}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filters.type === t
                  ? t === "lost" ? "bg-lost-light text-lost" : "bg-found-light text-found"
                  : "bg-surface text-text-secondary hover:bg-surface-2"
              }`}
            >
              {t === "lost" ? "Lost" : "Found"}
            </button>
          ))}
        </div>

        {activeCount > 0 && (
          <button onClick={clear} className="flex items-center gap-1 text-xs text-text-muted hover:text-error">
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3 grid gap-4 rounded-lg border border-border bg-bg p-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Category</label>
            <select
              value={filters.category ?? ""}
              onChange={(e) => set({ category: (e.target.value || undefined) as ItemCategory | undefined })}
              className="input-field text-sm"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Status</label>
            <select
              value={filters.status ?? ""}
              onChange={(e) => set({ status: (e.target.value || undefined) as ItemStatus | undefined })}
              className="input-field text-sm"
            >
              <option value="">All statuses</option>
              {Object.entries(STATUS_CONFIG).map(([val, conf]) => (
                <option key={val} value={val}>{conf.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Location</label>
            <input
              type="text"
              value={filters.location ?? ""}
              onChange={(e) => set({ location: e.target.value || undefined })}
              placeholder="e.g. Library"
              className="input-field text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
