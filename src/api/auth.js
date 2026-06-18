import { apiRequest } from "./client.js";
/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The API response.
 */
export async function login(email, password) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveTokenInLocalStorage(result.data.accessToken, result.data.name);
  return result.data;
}

/**
 * Registers a new user.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} bio - The user's biography.
 * @param {string} avatarUrl - The URL of the user's avatar.
 * @returns {Promise<Object>} The API response.
 */
export async function register(name, email, password, bio, avatarUrl) {
  const userData = {
    name,
    email,
    password,
  };

  userData.bio = bio.trim() || "";
  if (URL.canParse(avatarUrl)) {
    userData.avatar = { url: avatarUrl.trim(), alt: `${name}'s profile image` };
  }

  const result = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  saveTokenInLocalStorage(result.data.accessToken, result.data.name);
  return result.data;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("accessToken"));
}
/**
 * Saves the access token and user name in local storage.
 * @param {string} accessToken - The access token.
 * @param {string} userName - The user's name.
 */
function saveTokenInLocalStorage(accessToken, userName) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userName", userName);
}

export function getCurrentLogInCredentials() {
  const creds = {
    accessToken: localStorage.getItem("accessToken"),
    userName: localStorage.getItem("userName"),
  };
  console.log("Retrieved credentials:", creds);
  return creds;
}
