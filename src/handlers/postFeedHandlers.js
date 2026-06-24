import LoadingPost from "../components/loading.js";
import Fallback from "../pages/fallback.js";
import { PostList } from "../components/posts/PostList.js";
import { showPostModal } from "./postHandlers.js";

export function renderPosts(container, posts = [], { append = false } = {}) {
  if (!container) return;

  const html = PostList(posts);

  if (append) {
    container.insertAdjacentHTML("beforeend", html);
  } else {
    container.innerHTML = html;
  }
}

function setLoadButtonState(
  button,
  { disabled = false, text = "Show more posts", hidden = false } = {},
) {
  if (!button) return;

  button.disabled = disabled;
  button.textContent = text;
  button.hidden = hidden;
}

export function setupPostFeed({
  containerSelector,
  loadMoreButtonSelector,
  loadPosts,
  postsPerPage = 4,
  fallbackTitle = "Could not load posts",
}) {
  let currentPage = 1;

  const postsContainer = document.querySelector(containerSelector);
  const loadButton = document.querySelector(loadMoreButtonSelector);

  if (!postsContainer) return;

  async function loadInitialPosts() {
    postsContainer.innerHTML = Array.from({ length: postsPerPage }, () =>
      LoadingPost(),
    ).join("");

    setLoadButtonState(loadButton, {
      disabled: true,
      text: "Loading posts...",
      hidden: false,
    });

    try {
      const posts = await loadPosts(currentPage, postsPerPage);

      renderPosts(postsContainer, posts);

      setLoadButtonState(loadButton, {
        disabled: false,
        text: "Show more posts",
        hidden: posts.length < postsPerPage,
      });
    } catch (error) {
      postsContainer.innerHTML = Fallback({
        title: fallbackTitle,
        message: error.message,
      });

      console.error(fallbackTitle, error);

      setLoadButtonState(loadButton, {
        disabled: true,
        text: "Failed to load",
        hidden: false,
      });
    }
  }

  async function loadMorePosts() {
    currentPage += 1;

    setLoadButtonState(loadButton, {
      disabled: true,
      text: "Loading more...",
      hidden: false,
    });

    try {
      const posts = await loadPosts(currentPage, postsPerPage);

      if (posts.length > 0) {
        renderPosts(postsContainer, posts, { append: true });
      }

      setLoadButtonState(loadButton, {
        disabled: posts.length === 0,
        text: posts.length === 0 ? "No more posts" : "Show more posts",
        hidden: posts.length < postsPerPage,
      });
    } catch (error) {
      setLoadButtonState(loadButton, {
        disabled: false,
        text: "Load more posts",
        hidden: false,
      });

      console.error("Failed to load more posts:", error);
    }
  }

  postsContainer.addEventListener("click", (event) => {
    const postArticle = event.target.closest("article[data-post-id]");
    if (!postArticle) return;

    showPostModal(postArticle.dataset.postId);
  });

  loadButton?.addEventListener("click", loadMorePosts);

  loadInitialPosts();
}
