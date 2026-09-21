import type { ItemCategory, ItemStatus, ItemType } from "@/types";

// ── Relative time ───────────────────────────────────────────────
export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const secs = Math.floor((now - then) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Category labels & icons (lucide icon name) ──────────────────
export const CATEGORY_CONFIG: Record<ItemCategory, { label: string; icon: string }> = {
  phone: { label: "Phone", icon: "smartphone" },
  laptop: { label: "Laptop", icon: "laptop" },
  id_card: { label: "ID Card", icon: "credit-card" },
  keys: { label: "Keys", icon: "key-round" },
  bag: { label: "Bag", icon: "briefcase" },
  charger: { label: "Charger", icon: "plug" },
  wallet: { label: "Wallet", icon: "wallet" },
  headphones: { label: "Headphones", icon: "headphones" },
  clothing: { label: "Clothing", icon: "shirt" },
  book: { label: "Book", icon: "book-open" },
  other: { label: "Other", icon: "package" },
};

export const CATEGORIES = Object.entries(CATEGORY_CONFIG).map(([value, config]) => ({
  value: value as ItemCategory,
  ...config,
}));

// ── Status labels & colors ──────────────────────────────────────
export const STATUS_CONFIG: Record<ItemStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "text-primary", bg: "bg-primary-light" },
  claimed: { label: "Claimed", color: "text-pending", bg: "bg-pending-light" },
  recovered: { label: "Recovered", color: "text-recovered", bg: "bg-recovered-light" },
  expired: { label: "Expired", color: "text-text-muted", bg: "bg-surface" },
};

export const TYPE_CONFIG: Record<ItemType, { label: string; color: string; bg: string }> = {
  lost: { label: "Lost", color: "text-lost", bg: "bg-lost-light" },
  found: { label: "Found", color: "text-found", bg: "bg-found-light" },
};

// ── Image compression ───────────────────────────────────────────
export function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() }));
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// ── Debounce ────────────────────────────────────────────────────
export function debounce<T extends (...args: Parameters<T>) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
