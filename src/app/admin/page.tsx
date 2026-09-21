"use client";
import { Package, Users, CheckCircle2, GitCompareArrows, TrendingUp, AlertTriangle } from "lucide-react";

const STAT_CARDS = [
  { label: "Total Items", value: "—", icon: Package, color: "bg-primary-light text-primary" },
  { label: "Lost Reports", value: "—", icon: AlertTriangle, color: "bg-lost-light text-lost" },
  { label: "Found Reports", value: "—", icon: CheckCircle2, color: "bg-found-light text-found" },
  { label: "Recovered", value: "—", icon: TrendingUp, color: "bg-recovered-light text-recovered" },
  { label: "Active Matches", value: "—", icon: GitCompareArrows, color: "bg-pending-light text-pending" },
  { label: "Total Users", value: "—", icon: Users, color: "bg-surface-2 text-text-secondary" },
];

export default function AdminDashboard() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-text-secondary">Overview of the campus lost & found system.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STAT_CARDS.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-border p-5">
            <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-text-muted">
        Stats will populate once the backend&apos;s <code className="rounded bg-surface px-1 py-0.5 text-xs">/admin/stats</code> endpoint is connected.
      </p>
    </div>
  );
}
