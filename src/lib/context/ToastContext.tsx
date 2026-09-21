"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { X } from "lucide-react";

type ToastKind = "success" | "error" | "info" | "warning";
interface Toast { id: number; kind: ToastKind; message: string; }

const ToastCtx = createContext<{ toast: (kind: ToastKind, message: string) => void }>({
  toast: () => {},
});

export function useToast() { return useContext(ToastCtx); }

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((kind: ToastKind, message: string) => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const kindStyles: Record<ToastKind, string> = {
    success: "border-success bg-found-light text-found",
    error: "border-error bg-lost-light text-lost",
    info: "border-info bg-primary-light text-primary",
    warning: "border-warning bg-pending-light text-pending",
  };

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2 sm:right-6 sm:top-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex animate-[fade-in_0.3s_ease-out] items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-md ${kindStyles[t.kind]}`}
          >
            <span className="flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="opacity-60 transition-opacity hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
