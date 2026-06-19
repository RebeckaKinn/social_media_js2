import defaultProfileImage from "../assets/default_person.jpg";
import { getLoggedInProfile } from "../api/profiles.js";

export default function ProfilePage() {
  return /*html*/ `
    <h1>Profile</h1>
    <p>Your profile and posts will appear here.</p>
  `;
}

export function getProfileAvatar(url, alt) {
  const imageUrl = url || defaultProfileImage;
  const imageAlt = alt || "";
  return /*HTML*/ `
    <div class="profile-icon">
      <img src="${imageUrl}" alt="${imageAlt}" loading="lazy">
    </div>
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
