import { apiRequest } from "./client.js";
import { getCurrentLogInCredentials } from "./auth.js";

export async function getLoggedInProfile() {
  const credentials = getCurrentLogInCredentials();
  console.log(credentials.userName);
  const result = await getProfileByName(credentials.userName);
  return result.data;
}

export async function getProfileByName(name) {
  return await apiRequest(`/social/profiles/${name}`);
}
