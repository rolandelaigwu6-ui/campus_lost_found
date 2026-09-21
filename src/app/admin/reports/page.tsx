import { Flag } from "lucide-react";
import EmptyState from "@/components/empty/EmptyState";

export default function AdminReportsPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-text">Flagged Reports</h1>
      <p className="mt-1 text-sm text-text-secondary">Review reports flagged as spam, inappropriate, or duplicate.</p>
      <div className="mt-8"><EmptyState icon={Flag} title="No flagged reports" description="When users flag items as spam, inappropriate, or duplicate, they will appear here for review." /></div>
    </div>
  );
}
