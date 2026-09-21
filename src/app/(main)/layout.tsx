"use client";

import { AuthProvider } from "@/lib/context/AuthContext";
import { ToastProvider } from "@/lib/context/ToastContext";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <MobileBottomNav />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
