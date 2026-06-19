import { getLoggedInProfile } from "../api/profiles.js";
import { getProfileAvatar } from "../components/Profileavatar.js";

export default function ProfilePage() {
  return /*html*/ `
    <h1>Profile</h1>
    <p>Your profile and posts will appear here.</p>
  `;
}

export async function getCurrentProfileAvatar() {
  try {
    const loggedInProfile = await getLoggedInProfile();
    const avatar = loggedInProfile.avatar;
    return getProfileAvatar(avatar?.url, avatar?.alt);
  } catch (error) {
    console.error("Fail to find user information", error);
    return getProfileAvatar();
  }
}
