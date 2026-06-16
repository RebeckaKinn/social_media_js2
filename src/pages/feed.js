import { getPosts } from "../api/posts.js";
import LoadingPost from "../components/loading.js";
import Fallback from "./fallback.js";

export default function FeedPage() {
  return /*html*/ `
    <h1>pinkripple</h1>
    <h2>Welcome to pinkripple!</h2>
    <p>Explore the latest posts and connect with your network.</p>
    <section id="posts-feed" class="flex column gap-2" aria-live="polite">
    </section>
  `;
}

async function loadPosts(page = 1, limit = 10) {
  const result = await getPosts(page, limit);
  return result.data;
}
/**
 * Sets up the feed page by loading and displaying posts.
 * Has fallback if there is an issue with fetching the posts, as well as
 * loading per post.
 */
export function setupFeedPage() {
  const postsFeed = document.querySelector("#posts-feed");
  const page = 1;
  const limit = 10;

  if (!postsFeed) return;

  postsFeed.innerHTML = Array.from({ length: limit }, () => LoadingPost()).join(
    "",
  );

  loadPosts(page, limit)
    .then((posts) => {
      postsFeed.innerHTML = posts.map(createPostCard).join("");
    })
    .catch((error) => {
      postsFeed.innerHTML = Fallback({
        title: "Could not load posts",
        message: error.message,
      });
    });
}

function createPostCard(post) {
  return /*html*/ `
    <article class="post-card">
      <h3>${post.title || "Untitled post"}</h3>
      ${post.body ? `<p>${post.body}</p>` : ""}
    </article>
  `;
}
