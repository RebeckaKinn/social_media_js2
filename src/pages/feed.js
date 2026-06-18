import { getPosts } from "../api/posts.js";
import LoadingPost from "../components/loading.js";
import Fallback from "./fallback.js";
import { createPostCard } from "./post.js";

const POSTS_PER_PAGE = 2;
let currentPage = 1;

export default function FeedPage() {
  return /*html*/ `
    <h1>pinkripple</h1>
    <h2>Welcome to pinkripple!</h2>
    <p>Explore the latest posts and connect with your network.</p>
    <section id="posts-feed" class="flex column align-center gap-2" aria-live="polite">
    </section>
    <button id="load-more-posts-btn" class="alternative-button">Show more posts</button>
  `;
}

async function loadPosts(page = 1, limit = POSTS_PER_PAGE) {
  const result = await getPosts(page, limit);
  return result.data;
}

function renderPosts(posts, append = false) {
  const postsFeed = document.querySelector("#posts-feed");
  if (!postsFeed) return;

  const html = posts.map(createPostCard).join("");
  if (append) {
    postsFeed.insertAdjacentHTML("beforeend", html);
  } else {
    postsFeed.innerHTML = html;
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
      renderPosts(posts, false);
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
        renderPosts(posts, true);
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

  if (loadButton) {
    loadButton.addEventListener("click", loadMorePosts);
  }
}

/*
for clicking the post to open it. 

article.addEventListener("click", () => {
  const postId = article.dataset.postId;
  window.location.hash = `#/post/${postId}`;
});
*/
