import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import Badge from "../ui/Badge";
import { timeAgo, CATEGORY_CONFIG, TYPE_CONFIG, STATUS_CONFIG } from "@/lib/utils/helpers";
import type { Item } from "@/types";

export default function ItemCard({ item }: { item: Item }) {
  const typeConf = TYPE_CONFIG[item.type];
  const statusConf = STATUS_CONFIG[item.status];
  const catConf = CATEGORY_CONFIG[item.category];

  return (
    <Link
      href={`/items/${item.id}`}
      className="group block overflow-hidden rounded-xl border border-border bg-bg transition-shadow hover:shadow-md"
    >
      {item.images.length > 0 ? (
        <div className="relative h-44 overflow-hidden bg-surface">
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <Badge className={`absolute left-3 top-3 ${typeConf.bg} ${typeConf.color}`}>
            {typeConf.label}
          </Badge>
        </div>
      ) : (
        <div className="relative flex h-44 items-center justify-center bg-surface">
          <span className="text-4xl text-text-muted">📦</span>
          <Badge className={`absolute left-3 top-3 ${typeConf.bg} ${typeConf.color}`}>
            {typeConf.label}
          </Badge>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-text group-hover:text-primary">{item.title}</h3>
          <Badge className={`shrink-0 ${statusConf.bg} ${statusConf.color}`}>{statusConf.label}</Badge>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {item.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {timeAgo(item.createdAt)}
          </span>
          <span className="rounded bg-surface px-1.5 py-0.5">{catConf.label}</span>
        </div>
      </div>
    </Link>
  );
}
