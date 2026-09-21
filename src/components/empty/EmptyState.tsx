import { SearchX } from "lucide-react";
import Button from "../ui/Button";

export default function EmptyState({
  icon: Icon = SearchX,
  title = "Nothing here yet",
  description = "Items will appear here once they're reported.",
  actionLabel,
  actionHref,
}: {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2">
        <Icon size={24} className="text-text-muted" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-text">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>
      {actionLabel && actionHref && (
        <a href={actionHref} className="mt-5">
          <Button size="sm">{actionLabel}</Button>
        </a>
      )}
    </div>
  );
}
