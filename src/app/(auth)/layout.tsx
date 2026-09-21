"use client";

import { AuthProvider } from "@/lib/context/AuthContext";
import { ToastProvider } from "@/lib/context/ToastContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}
