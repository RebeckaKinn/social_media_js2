import { getPosts, searchPosts } from "../api/posts.js";
import { getSearchQuery } from "../components/search.js";
import { setupNewPostButton } from "./postHandlers.js";
import { setupPostFeed } from "./postFeedHandlers.js";

const POSTS_PER_PAGE = 4;

export function setupFeedPage() {
  const postsContainer = document.querySelector("#posts-feed");

  if (!postsContainer) return;

  const query = getSearchQuery();
  const feedTitle = document.querySelector(".feed-title");

  if (query && feedTitle) {
    feedTitle.textContent = `Search results for “${query}”`;
  }

  setupNewPostButton();

  setupPostFeed({
    containerSelector: "#posts-feed",
    loadMoreButtonSelector: "#load-more-posts-btn",
    postsPerPage: POSTS_PER_PAGE,

    loadPosts: async (page, limit) => {
      const result = query
        ? await searchPosts(query, page, limit)
        : await getPosts(page, limit);

      return result.data;
    },

    fallbackTitle: query ? "Could not search posts" : "Could not load posts",

    emptyMessage: query
      ? "No posts matched your search."
      : "There are no posts yet.",
  });
}
