"use client";
import { GitCompareArrows } from "lucide-react";
import EmptyState from "@/components/empty/EmptyState";

export default function MatchesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-text">Matches</h1>
      <p className="mt-1 text-sm text-text-secondary">
        When the system finds a possible match between a lost report and a found report, it will appear here.
      </p>

      <div className="mt-8">
        <EmptyState
          icon={GitCompareArrows}
          title="No matches yet"
          description="The matching algorithm will compare descriptions, categories, locations, and dates to suggest possible matches. Check back after more items are reported."
        />
      </div>
    </div>
  );
}
