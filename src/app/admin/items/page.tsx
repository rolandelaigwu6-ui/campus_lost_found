import { Package } from "lucide-react";
import EmptyState from "@/components/empty/EmptyState";

export default function AdminItemsPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-text">Manage Items</h1>
      <p className="mt-1 text-sm text-text-secondary">Review, moderate, and manage all reported items.</p>
      <div className="mt-8"><EmptyState icon={Package} title="No items" description="All reported items will appear here for moderation once the backend is connected." /></div>
    </div>
  );
}
