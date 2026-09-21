"use client";
import Link from "next/link";
import { Plus, Search, GitCompareArrows, AlertTriangle, CheckCircle2, Package } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import EmptyState from "@/components/empty/EmptyState";
import Button from "@/components/ui/Button";

const QUICK_ACTIONS = [
  { href: "/report/lost", label: "Report Lost Item", icon: AlertTriangle, color: "bg-lost-light text-lost" },
  { href: "/report/found", label: "Report Found Item", icon: CheckCircle2, color: "bg-found-light text-found" },
  { href: "/search", label: "Search Items", icon: Search, color: "bg-primary-light text-primary" },
  { href: "/matches", label: "View Matches", icon: GitCompareArrows, color: "bg-recovered-light text-recovered" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Welcome{user ? `, ${user.fullName.split(" ")[0]}` : ""}</h1>
        <p className="mt-1 text-sm text-text-secondary">What would you like to do today?</p>
      </div>

      {/* quick actions */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border p-5 text-center transition-shadow hover:shadow-md"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}>
              <action.icon size={22} />
            </div>
            <span className="text-sm font-medium text-text group-hover:text-primary">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* recent activity - empty state for now */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Your Recent Reports</h2>
          <Link href="/search" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="mt-4">
          <EmptyState
            icon={Package}
            title="No reports yet"
            description="Once you report a lost or found item, it will appear here."
            actionLabel="Report an item"
            actionHref="/report/lost"
          />
        </div>
      </div>
    </div>
  );
}
