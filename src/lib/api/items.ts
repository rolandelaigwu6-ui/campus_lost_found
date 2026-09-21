import { api } from "./client";
import type {
  Item,
  ReportItemRequest,
  UpdateItemRequest,
  ItemFilters,
  PaginatedResponse,
} from "@/types";

/**
 * BACKEND ENDPOINTS:
 *   GET    /items            → ItemFilters (query params) → PaginatedResponse<Item>
 *   GET    /items/:id        →                            → Item
 *   POST   /items            → multipart/form-data        → Item
 *   PATCH  /items/:id        → UpdateItemRequest          → Item
 *   DELETE /items/:id        →                            → void
 *   GET    /items/my         →                            → PaginatedResponse<Item>
 *
 * Image uploads: images are sent as File objects in a multipart/form-data
 * body. The backend should store them (disk, S3, etc.) and return URLs.
 */

function filtersToParams(filters: ItemFilters): string {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(filters)) {
    if (val !== undefined && val !== null && val !== "") {
      params.set(key, String(val));
    }
  }
  return params.toString();
}

export const itemsApi = {
  async list(filters: ItemFilters = {}): Promise<PaginatedResponse<Item>> {
    const qs = filtersToParams(filters);
    return api.get<PaginatedResponse<Item>>(`/items?${qs}`);
  },

  async get(id: string): Promise<Item> {
    return api.get<Item>(`/items/${id}`);
  },

  async report(data: ReportItemRequest): Promise<Item> {
    const form = new FormData();
    form.append("type", data.type);
    form.append("category", data.category);
    form.append("title", data.title);
    form.append("description", data.description);
    form.append("location", data.location);
    if (data.locationDetail) form.append("locationDetail", data.locationDetail);
    form.append("dateOccurred", data.dateOccurred);
    form.append("contactMethod", data.contactMethod);
    form.append("contactValue", data.contactValue);
    if (data.images) {
      data.images.forEach((file) => form.append("images", file));
    }
    return api.post<Item>("/items", form);
  },

  async update(id: string, data: UpdateItemRequest): Promise<Item> {
    return api.patch<Item>(`/items/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/items/${id}`);
  },

  async myItems(page = 1): Promise<PaginatedResponse<Item>> {
    return api.get<PaginatedResponse<Item>>(`/items/my?page=${page}`);
  },

  async markRecovered(id: string): Promise<Item> {
    return api.patch<Item>(`/items/${id}`, { status: "recovered" });
  },
};
