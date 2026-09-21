import { Users } from "lucide-react";
import EmptyState from "@/components/empty/EmptyState";

export default function AdminUsersPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-text">Manage Users</h1>
      <p className="mt-1 text-sm text-text-secondary">View registered users, change roles, and manage accounts.</p>
      <div className="mt-8"><EmptyState icon={Users} title="No users" description="Registered users will appear here once the backend is connected." /></div>
    </div>
  );
}
