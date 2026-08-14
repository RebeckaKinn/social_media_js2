// Shared API request helper.
// Prevents repeating the API URL and headers in every API module.

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export function hasApiConfig() {
  return Boolean(API_URL && API_KEY);
}
/**
 * Makes a request to the API.
 * @param {string} path - The API endpoint.
 * @param {Object} options - The request options.
 * @returns {Promise<Object>} The API response.
 * 
 * This function gets passed a path and options (which is optional). 
 * This is used every time a call to the API is required, to fetch or create users, fetch, create or delete
 * posts, etc. 
 * First it calls on hasApiConfig(), that returns true if the API URL or API key is present, or false if they are missing. 
 * If they are missing, it throws an error. 
 * 
 * Then it goes into localStorage to get the stored accessToken, which is connected to the current logged in user. 
 * Then, a header-object is created, passing the options (or an empty object if there was no options passed).
 * We then add additional information in the header, such as the API key, information about the data type and structure, 
 * and the accessToken as authorization (if it is accessible). 
 * 
 * It then calles fetch() and passes down the API URL, the path passed to the function, and adding headers and 
 * a copy of the options as an object. 
 * It checks if the returned response is 204, then returns null if it is true. (It returns 204 if a post or comment is deleted).
 * Then it checks if the response of the result was successful. 
 * If not, it displays an error, which is either the result error message or a default message. 
 * Then throws a new error object with that message. 
 * At last it returns the result. 
 */
export async function apiRequest(path, options = {}) {
  if (!hasApiConfig()) {
    throw new Error("Missing API information.");
  }

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

  if (response.status === 204) {
    return null;
  }

  const result = await response.json();

  if (!response.ok) {
    const message = result.errors?.[0]?.message || "Something went wrong.";
    throw new Error(message);
  }

  return result;
}
