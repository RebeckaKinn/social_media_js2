// Shared API request helper.
// Prevents repeating the API URL and headers in every API module.

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_URL || !API_KEY) {
  throw new Error("Missing API information.");
}

export async function apiRequest(path, options = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");
  headers.set("X-Noroff-API-Key", API_KEY);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Something went wrong.";
    throw new Error(message);
  }

  return result;
}
