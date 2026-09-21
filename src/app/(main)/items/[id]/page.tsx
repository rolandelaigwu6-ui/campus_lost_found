"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, User, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/empty/EmptyState";

export default function ItemDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Item will be fetched from API when backend is connected.
  // For now, show a structured empty state.
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <button onClick={() => router.back()} className="mb-6 flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text">
        <ArrowLeft size={16} /> Back
      </button>

      <EmptyState
        title="Item not loaded"
        description={`Item ${id} will load here once the backend API is connected. The page is structured to display: image gallery, title, description, location, date, category, status, reporter info, contact button, and suggested matches.`}
      />

      {/* Structured layout ready for real data: */}
      <div className="mt-8 space-y-6 opacity-40">
        <div className="h-64 rounded-xl border-2 border-dashed border-border bg-surface" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 rounded bg-surface" />
          <div className="flex gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1"><MapPin size={14} /> Location</span>
            <span className="flex items-center gap-1"><Clock size={14} /> Date</span>
            <span className="flex items-center gap-1"><User size={14} /> Reporter</span>
          </div>
          <div className="h-24 rounded bg-surface" />
          <Button disabled><MessageCircle size={16} /> Contact Finder</Button>
        </div>
      </div>
    </div>
  );
}
