import { getPosts } from "../api/posts.js";
import { showNewPostSection } from "./postHandlers.js";
import { setupPostFeed } from "./postFeedHandlers.js";

const POSTS_PER_PAGE = 4;

export function setupFeedPage() {
  showNewPostSection();

  setupPostFeed({
    containerSelector: "#posts-feed",
    loadMoreButtonSelector: "#load-more-posts-btn",
    postsPerPage: POSTS_PER_PAGE,
    loadPosts: async (page, limit) => {
      const result = await getPosts(page, limit);
      return result.data;
    },
    fallbackTitle: "Could not load posts",
  });
}
