import { getPostsByProfile } from "../api/posts.js";
import { getProfileByName, getLoggedInProfile } from "../api/profiles.js";
import { setupPostFeed } from "./postFeedHandlers.js";
import { showNewPostSection } from "./postHandlers.js";

const POSTS_PER_PAGE = 4;
export function setupProfilePage() {
  const banner = document.querySelector("#profile-banner");
  const bio = document.querySelector("#profile-bio");
  const info = document.querySelector("#profile-info");

  if (!banner) return;
  const user = getLoggedInProfile();

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
