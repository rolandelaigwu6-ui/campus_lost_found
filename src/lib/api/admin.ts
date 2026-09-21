import { api } from "./client";
import type { AdminStats, AdminReport, Item, User, PaginatedResponse } from "@/types";

/**
 * BACKEND ENDPOINTS (admin-only, require role=admin or moderator):
 *   GET    /admin/stats       →                 → AdminStats
 *   GET    /admin/items       → query params    → PaginatedResponse<Item>
 *   PATCH  /admin/items/:id   → { status }      → Item
 *   DELETE /admin/items/:id   →                 → void
 *   GET    /admin/users       → ?page=&limit=   → PaginatedResponse<User>
 *   PATCH  /admin/users/:id   → { role }        → User
 *   GET    /admin/reports     → ?status=pending  → PaginatedResponse<AdminReport>
 *   PATCH  /admin/reports/:id → { status }       → AdminReport
 */
export const adminApi = {
  async stats(): Promise<AdminStats> {
    return api.get<AdminStats>("/admin/stats");
  },

  async listItems(page = 1, limit = 20): Promise<PaginatedResponse<Item>> {
    return api.get<PaginatedResponse<Item>>(`/admin/items?page=${page}&limit=${limit}`);
  },

  async updateItemStatus(id: string, status: string): Promise<Item> {
    return api.patch<Item>(`/admin/items/${id}`, { status });
  },

  async deleteItem(id: string): Promise<void> {
    return api.delete(`/admin/items/${id}`);
  },

  async listUsers(page = 1, limit = 20): Promise<PaginatedResponse<User>> {
    return api.get<PaginatedResponse<User>>(`/admin/users?page=${page}&limit=${limit}`);
  },

  async updateUserRole(id: string, role: string): Promise<User> {
    return api.patch<User>(`/admin/users/${id}`, { role });
  },

  async listReports(status = "pending", page = 1): Promise<PaginatedResponse<AdminReport>> {
    return api.get<PaginatedResponse<AdminReport>>(`/admin/reports?status=${status}&page=${page}`);
  },

  async resolveReport(id: string, status: "resolved" | "dismissed"): Promise<AdminReport> {
    return api.patch<AdminReport>(`/admin/reports/${id}`, { status });
  },
};
