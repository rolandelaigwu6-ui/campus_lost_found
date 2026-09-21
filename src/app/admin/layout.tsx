"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users, Flag, ArrowLeft } from "lucide-react";
import { AuthProvider } from "@/lib/context/AuthContext";
import { ToastProvider } from "@/lib/context/ToastContext";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/items", label: "Items", icon: Package },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: Flag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="flex min-h-dvh">
          <aside className="hidden w-56 border-r border-border bg-surface p-4 md:block">
            <Link href="/dashboard" className="mb-6 flex items-center gap-2 text-sm text-text-secondary hover:text-primary">
              <ArrowLeft size={14} /> Back to app
            </Link>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Admin</p>
            <nav className="space-y-1">
              {ADMIN_NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-primary-light text-primary font-medium" : "text-text-secondary hover:bg-surface-2"}`}>
                    <item.icon size={16} /> {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
