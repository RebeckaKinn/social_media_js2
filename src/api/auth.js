import { apiRequest } from "./client.js";
/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The API response.
 * It does a apiRequest by sending the email and password in the body, 
 * sending the required information to the API (the logged in user). 
 * It then calls for savTokenInLocalStorage(), which saves the returned accessToken and username from the API.
 * Then, the function returnes the data it fetched from the API, which is connected to the logged in user. 
 * 
 * This function would be used after the user is vertified, to save the information in the API, and then
 * to get the correct data belonging to the user. 
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
 * 
 * This function is called after the params are vertified. It then creates an object "userData" to save the
 * passed data in a structure matching the API endpoints. 
 * Then checking if we can trim the passed bio, or send an empty string. 
 * For the "avatarUrl", it checks if it can parse as a URL before creating an object with both the URL and ALT, then using the 
 * passed "name", which is a required field (which means it has value).
 * 
 * Then, it sends an API request to register the new user, sending the "userData"-object in the body. 
 * The apiRequest returns the user with the new fields and structure, whish we then save the accessToken and name
 * to localStorage using saveTokenInLocalStorage(). 
 * At last, it returns the result data from the API. 
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
 * 
 * It get passed down an accessToken and the name of the user that is currently logged in. 
 * It get this from the API, and the function is used after a successful API fetch, either in 
 * logIn or register. 
 * It is then easy to get access to the current logged in users information. 
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
  return creds;
}
