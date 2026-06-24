import { getLoggedInProfile } from "../../api/profiles.js";
import { getProfileAvatar } from "../Profileavatar.js";

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

export function ProfileBanner({ name, avatar, banner }) {
  return /*HTML*/ `
    <div class="flex gap-2 align-center">
        ${profileBanner(banner.url, banner.alt)}
        ${getProfileAvatar(avatar?.url, avatar?.alt)}
        <h2>${name}</h2>
      </div>
  `;
}

function profileBanner(url, alt) {
  return /*HTML*/ `
  <div>
      <img src="${url}" alt="${alt || ""}" loading="lazy">
    </div>
  `;
}
