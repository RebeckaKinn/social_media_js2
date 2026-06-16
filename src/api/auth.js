import { apiRequest } from "./client.js";

export async function login(email, password) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveTokenInLocalStorage(result.data.accessToken, result.data.userName);

  return result.data;
}

export async function register(name, email, password, bio, avatarUrl) {
  const userData = {
    name,
    email,
    password,
  };

  if (bio.trim()) {
    userData.bio = bio.trim();
  }

  if (avatarUrl.trim()) {
    userData.avatar = {
      url: avatarUrl.trim(),
      alt: `${name}'s profile image`,
    };
  }

  const result = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  saveTokenInLocalStorage(result.data.accessToken, result.data.userName);
  return result.data;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("accessToken"));
}

function saveTokenInLocalStorage(accessToken, userName) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userName", userName);
}
