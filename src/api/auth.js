import { apiRequest } from "./client.js";

export async function login(email, password) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("accessToken", result.data.accessToken);
  localStorage.setItem("userName", result.data.userName);

  return result.data;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("accessToken"));
}
