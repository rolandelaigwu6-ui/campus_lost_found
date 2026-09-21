"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Plus, User, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/search", label: "Search", icon: Search },
  { href: "/report/lost", label: "Report", icon: Plus },
  { href: "/matches", label: "Matches", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-text">
              LF
            </span>
            <span className="hidden text-sm font-semibold text-text sm:block">Lost & Found</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active ? "bg-primary-light text-primary font-medium" : "text-text-secondary hover:bg-surface"
                    }`}
                  >
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {user.role === "admin" && (
              <Link href="/admin" className="hidden text-xs font-medium text-text-muted transition-colors hover:text-primary sm:block">
                Admin
              </Link>
            )}
            <button onClick={logout} className="hidden text-text-muted transition-colors hover:text-error md:block" title="Log out">
              <LogOut size={18} />
            </button>
            <button onClick={() => setOpen(!open)} className="text-text md:hidden">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        {open && (
          <div className="border-t border-border bg-bg px-4 pb-4 md:hidden">
            <ul className="space-y-1 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                      pathname.startsWith(link.href) ? "bg-primary-light text-primary" : "text-text-secondary"
                    }`}
                  >
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                </li>
              ))}
              {user.role === "admin" && (
                <li>
                  <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-text-secondary">
                    <LayoutDashboard size={16} /> Admin Panel
                  </Link>
                </li>
              )}
              <li>
                <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-error">
                  <LogOut size={16} /> Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
