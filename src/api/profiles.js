import { apiRequest } from "./client.js";
import { getCurrentLogInCredentials } from "./auth.js";

export async function getLoggedInProfile() {
  const credentials = getCurrentLogInCredentials();
  const params = new URLSearchParams({
    _following: "true",
  });
  const result = await apiRequest(
    `/social/profiles/${encodeURIComponent(credentials.userName)}?${params}`,
  );
  return result.data;
}

export async function getProfileByName(name) {
  return await apiRequest(`/social/profiles/${encodeURIComponent(name)}`);
}

export function followProfile(name) {
  return apiRequest(`/social/profiles/${encodeURIComponent(name)}/follow`, {
    method: "PUT",
  });
}

export function unfollowProfile(name) {
  return apiRequest(`/social/profiles/${encodeURIComponent(name)}/unfollow`, {
    method: "PUT",
  });
}
