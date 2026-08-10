import { getLoggedInProfile } from "../../api/profiles.js";
import { getProfileAvatar } from "../ProfileAvatar.js";
import { FollowButton } from "../FollowButton.js";

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

export function ProfileBanner({
  name,
  avatar,
  banner,
  isOwnProfile,
  isFollowing = false,
} = {}) {
  return /*HTML*/ `
    <div class="profile-banner flex gap-2 align-center">
        ${profileBannerBackgorund(banner.url, banner.alt)}
        <div class="profile-banner-content flex gap-2 align-center">
          ${getProfileAvatar(avatar?.url, avatar?.alt)}
          <h2>${name}</h2>
          ${!isOwnProfile ? FollowButton({ following: isFollowing }) : ""}
        </div>
      </div>
  `;
}

function profileBannerBackgorund(url, alt) {
  return /*HTML*/ `
    <div class="profile-banner-background">
      <img src="${url}" alt="${alt || ""}" loading="lazy">
    </div>
  `;
}
