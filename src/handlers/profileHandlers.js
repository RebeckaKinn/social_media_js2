import { getPostsByProfile } from "../api/posts.js";
import { getProfileByName, getLoggedInProfile } from "../api/profiles.js";
import { setupPostFeed } from "./postFeedHandlers.js";
import { showNewPostSection } from "./postHandlers.js";
import { ProfileBanner } from "../components/profile/profileHeaders.js";
import {
  ProfileBio,
  ProfileInformation,
} from "../components/profile/profileInformation.js";

const POSTS_PER_PAGE = 4;

export async function setupProfilePage() {
  const banner = document.querySelector("#profile-banner");
  const bio = document.querySelector("#profile-bio");
  const info = document.querySelector("#profile-info");

  if (!banner) return;
  const user = await getProfileForCurrentRoute();
  console.log(user);
  banner.innerHTML = ProfileBanner({
    name: user.name,
    avatar: user.avatar,
    banner: user.banner,
  });
  bio.innerHTML = ProfileBio(user.bio);
  info.innerHTML = ProfileInformation({
    followers: user._count.followers,
    following: user._count.following,
    posts: user._count.posts,
  });
  showNewPostSection();
  setupPostFeed({
    containerSelector: "#profile-post-feed",
    loadMoreButtonSelector: "#load-more-posts-btn",
    postsPerPage: POSTS_PER_PAGE,
    loadPosts: async (page, limit) => {
      const result = await getPostsByProfile(user.name, page, limit);
      return result.data;
    },
    fallbackTitle: "Could not load profile posts",
  });
}

function getProfileNameFromRoute() {
  const path = window.location.hash.slice(1) || "/profile";
  const match = path.match(/^\/profile\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : "";
}

async function getProfileForCurrentRoute() {
  const profileName = getProfileNameFromRoute();

  if (!profileName) {
    return await getLoggedInProfile();
  }

  const result = await getProfileByName(profileName);
  return result.data;
}
