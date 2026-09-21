import { api, setToken, clearToken } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest, User, UpdateProfileRequest } from "@/types";

/**
 * BACKEND ENDPOINTS:
 *   POST /auth/login        → LoginRequest    → AuthResponse
 *   POST /auth/register     → RegisterRequest → AuthResponse
 *   GET  /auth/me           →                 → User
 *   PATCH /auth/me          → UpdateProfileRequest → User
 *   POST /auth/logout       →                 → void
 */
export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", data);
    setToken(res.token);
    return res;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/register", data);
    setToken(res.token);
    return res;
  },

  async getMe(): Promise<User> {
    return api.get<User>("/auth/me");
  },

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    return api.patch<User>("/auth/me", data);
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout").catch(() => {});
    clearToken();
  },
};
