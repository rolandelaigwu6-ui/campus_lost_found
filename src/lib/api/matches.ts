import { api } from "./client";
import type { Match, SuggestMatchRequest, PaginatedResponse } from "@/types";

/**
 * BACKEND ENDPOINTS:
 *   GET  /matches            → ?page=&limit=  → PaginatedResponse<Match>
 *   GET  /matches/:id        →                → Match
 *   POST /matches/suggest    → SuggestMatchRequest → Match
 *   PATCH /matches/:id/confirm → { status: "confirmed" | "rejected" } → Match
 *   GET  /matches/for-item/:itemId → PaginatedResponse<Match>
 */
export const matchesApi = {
  async list(page = 1, limit = 20): Promise<PaginatedResponse<Match>> {
    return api.get<PaginatedResponse<Match>>(`/matches?page=${page}&limit=${limit}`);
  },

  async get(id: string): Promise<Match> {
    return api.get<Match>(`/matches/${id}`);
  },

  async suggest(data: SuggestMatchRequest): Promise<Match> {
    return api.post<Match>("/matches/suggest", data);
  },

  async confirm(id: string): Promise<Match> {
    return api.patch<Match>(`/matches/${id}/confirm`, { status: "confirmed" });
  },

  async reject(id: string): Promise<Match> {
    return api.patch<Match>(`/matches/${id}/confirm`, { status: "rejected" });
  },

  async forItem(itemId: string): Promise<PaginatedResponse<Match>> {
    return api.get<PaginatedResponse<Match>>(`/matches/for-item/${itemId}`);
  },
};
