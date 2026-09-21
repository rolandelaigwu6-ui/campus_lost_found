"use client";

import { Suspense, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Package } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import FilterPanel from "@/components/search/FilterPanel";
import EmptyState from "@/components/empty/EmptyState";
import type { ItemFilters } from "@/types";

function SearchContent() {
  const params = useSearchParams();
  const [filters, setFilters] = useState<ItemFilters>({
    type: (params.get("type") as ItemFilters["type"]) ?? undefined,
    q: params.get("q") ?? "",
    page: 1,
    limit: 20,
  });

  const onSearch = useCallback((q: string) => setFilters((f) => ({ ...f, q, page: 1 })), []);

  return (
    <>
      <div className="space-y-4">
        <SearchBar value={filters.q ?? ""} onChange={onSearch} />
        <FilterPanel filters={filters} onChange={setFilters} />
      </div>

      <div className="mt-8">
        <EmptyState
          icon={Package}
          title="No items to show"
          description="Items will appear here once the backend is connected and reports are submitted."
          actionLabel="Report an item"
          actionHref="/report/lost"
        />
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-text">Search Items</h1>
      <p className="mt-1 text-sm text-text-secondary">Browse all reported lost and found items on campus.</p>
      <div className="mt-6">
        <Suspense fallback={<div className="h-20 animate-pulse rounded-lg bg-surface" />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
