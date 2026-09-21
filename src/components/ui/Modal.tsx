"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Modal({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-full max-w-lg rounded-xl border border-border bg-bg p-0 shadow-lg backdrop:bg-black/40"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <button onClick={onClose} className="text-text-muted transition-colors hover:text-text">
          <X size={18} />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
