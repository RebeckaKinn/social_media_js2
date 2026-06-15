import { apiRequest } from "./client.js";

export async function login(email, password) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("accessToken", result.data.accessToken);

  return result.data;
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("accessToken"));
}
