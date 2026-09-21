import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-text hover:bg-primary-hover",
  secondary: "border border-border bg-bg text-text hover:bg-surface",
  danger: "bg-error text-white hover:opacity-90",
  ghost: "text-text-secondary hover:bg-surface",
};
const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children, variant = "primary", size = "md", loading, className = "", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean }) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
