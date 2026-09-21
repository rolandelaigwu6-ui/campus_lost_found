"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Search, PlusCircle, GitCompareArrows, User } from "lucide-react";

const TABS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/search", label: "Search", icon: Search },
  { href: "/report/lost", label: "Report", icon: PlusCircle },
  { href: "/matches", label: "Matches", icon: GitCompareArrows },
  { href: "/profile", label: "Profile", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 backdrop-blur-md md:hidden">
      <ul className="mx-auto flex max-w-md items-center justify-around">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 px-2 pb-2 pt-2.5 text-[10px] transition-colors ${
                  active ? "text-primary" : "text-text-muted"
                }`}
              >
                <tab.icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
