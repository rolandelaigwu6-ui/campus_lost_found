/**
 * ════════════════════════════════════════════════════════════════
 *  SHARED TYPES — THE API CONTRACT
 *
 *  These types define the exact shape of every request and response
 *  between the frontend and backend. Backend developers: implement
 *  your API to match these shapes exactly and the frontend works
 *  without changes.
 *
 *  See src/lib/api/ for the endpoint URLs and HTTP methods.
 * ════════════════════════════════════════════════════════════════
 */

// ── Core enums ──────────────────────────────────────────────────

export type ItemType = "lost" | "found";
export type ItemStatus = "active" | "claimed" | "recovered" | "expired";
export type ItemCategory =
  | "phone"
  | "laptop"
  | "id_card"
  | "keys"
  | "bag"
  | "charger"
  | "wallet"
  | "headphones"
  | "clothing"
  | "book"
  | "other";

export type UserRole = "student" | "moderator" | "admin";
export type MatchStatus = "pending" | "confirmed" | "rejected";

// ── User ────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string | null;
  department: string | null;
  role: UserRole;
  createdAt: string; // ISO 8601
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  department?: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  department?: string;
  avatarUrl?: string | null;
}

// ── Item ────────────────────────────────────────────────────────

export interface Item {
  id: string;
  type: ItemType;
  status: ItemStatus;
  category: ItemCategory;
  title: string;
  description: string;
  location: string;
  /** Building, floor, room, etc. — optional extra specificity */
  locationDetail: string | null;
  /** ISO 8601 date string — when the item was lost/found */
  dateOccurred: string;
  images: string[]; // array of image URLs
  contactMethod: string; // e.g. "email", "phone", "telegram"
  contactValue: string;
  reportedBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface ReportItemRequest {
  type: ItemType;
  category: ItemCategory;
  title: string;
  description: string;
  location: string;
  locationDetail?: string;
  dateOccurred: string;
  /** File objects — handled as multipart/form-data */
  images?: File[];
  contactMethod: string;
  contactValue: string;
}

export interface UpdateItemRequest {
  status?: ItemStatus;
  title?: string;
  description?: string;
  location?: string;
  locationDetail?: string;
  category?: ItemCategory;
}

export interface ItemFilters {
  type?: ItemType;
  status?: ItemStatus;
  category?: ItemCategory;
  location?: string;
  q?: string; // free-text search
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "dateOccurred";
  sortOrder?: "asc" | "desc";
}

// ── Match ───────────────────────────────────────────────────────

export interface Match {
  id: string;
  lostItem: Item;
  foundItem: Item;
  /** 0–100 confidence score from the matching algorithm */
  confidence: number;
  status: MatchStatus;
  suggestedBy: "system" | "user";
  createdAt: string;
}

export interface SuggestMatchRequest {
  lostItemId: string;
  foundItemId: string;
}

// ── Paginated response ──────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ── Admin ───────────────────────────────────────────────────────

export interface AdminStats {
  totalItems: number;
  lostItems: number;
  foundItems: number;
  recoveredItems: number;
  activeMatches: number;
  totalUsers: number;
  itemsThisWeek: number;
  recoveryRate: number; // percentage 0–100
}

export interface AdminReport {
  id: string;
  type: "spam" | "inappropriate" | "duplicate" | "other";
  reason: string;
  itemId: string;
  reportedBy: User;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
}
