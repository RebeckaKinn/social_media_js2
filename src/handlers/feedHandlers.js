import { getPosts } from "../api/posts.js";
import LoadingPost from "../components/loading.js";
import Fallback from "../pages/fallback.js";
import { showPostModal } from "./postHandlers.js";
import { PostList } from "../components/posts/PostList.js";

const POSTS_PER_PAGE = 4;
let currentPage = 1;

export function setupFeedPage() {
  currentPage = 1;
  const postsFeed = document.querySelector("#posts-feed");
  const loadButton = document.querySelector("#load-more-posts-btn");

  if (!postsFeed) return;

  const loadInitialPosts = async () => {
    postsFeed.innerHTML = Array.from({ length: POSTS_PER_PAGE }, () =>
      LoadingPost(),
    ).join("");
    setLoadButtonState({
      disabled: true,
      text: "Loading posts...",
      hidden: false,
    });

    try {
      const posts = await loadPosts(currentPage);
      renderPosts(postsFeed, posts);
      setLoadButtonState({
        disabled: false,
        text: "Show more posts",
        hidden: posts.length < POSTS_PER_PAGE,
      });
    } catch (error) {
      postsFeed.innerHTML = Fallback({
        title: "Could not load posts",
        message: error.message,
      });
      console.error("Could not load posts:", error);
      setLoadButtonState({
        disabled: true,
        text: "Failed to load",
        hidden: false,
      });
    }
  };

  const loadMorePosts = async () => {
    currentPage += 1;
    setLoadButtonState({
      disabled: true,
      text: "Loading more...",
      hidden: false,
    });

    try {
      const posts = await loadPosts(currentPage);
      if (posts.length > 0) {
        renderPosts(postsFeed, posts, { append: true });
      }
      setLoadButtonState({
        disabled: false,
        text: "Show more posts",
        hidden: posts.length < POSTS_PER_PAGE,
      });
      if (posts.length === 0) {
        setLoadButtonState({
          disabled: true,
          text: "No more posts",
          hidden: false,
        });
      }
    } catch (error) {
      setLoadButtonState({
        disabled: false,
        text: "Load more posts",
        hidden: false,
      });
      console.error("Failed to load more posts:", error);
    }
  };

  loadInitialPosts();
  postsFeed.addEventListener("click", (event) => {
    const postArticle = event.target.closest("article[data-post-id]");
    if (!postArticle) return;

    const postId = postArticle.dataset.postId;
    showPostModal(postId);
  });

  if (loadButton) {
    loadButton.addEventListener("click", loadMorePosts);
  }
}

async function loadPosts(page = 1, limit = POSTS_PER_PAGE) {
  const result = await getPosts(page, limit);
  return result.data;
}

// function renderPosts(posts, append = false) {
//   const postsFeed = document.querySelector("#posts-feed");
//   if (!postsFeed) return;

//   const html = PostList(posts);
//   if (append) {
//     postsFeed.insertAdjacentHTML("beforeend", html);
//   } else {
//     postsFeed.innerHTML = html;
//   }
// }

export function renderPosts(container, posts = [], { append = false } = {}) {
  if (!container) return;

  const html = PostList(posts);

  if (append) {
    container.insertAdjacentHTML("beforeend", html);
  } else {
    container.innerHTML = html;
  }
}

function setLoadButtonState({
  disabled = false,
  text = "Show more posts",
  hidden = false,
}) {
  const button = document.querySelector("#load-more-posts-btn");
  if (!button) return;
  button.disabled = disabled;
  button.textContent = text;
  button.hidden = hidden;
}
