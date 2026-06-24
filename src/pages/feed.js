import { getCurrentLogInCredentials } from "../api/auth.js";

export default function FeedPage() {
  const user = getCurrentLogInCredentials() || "";
  return /*html*/ `
    <h1 class="feed-title">Welcome ${user.userName}</h1>
    <section id="new-post"></section>
    <section id="posts-feed" class="flex column align-center gap-2" aria-live="polite">
    </section>
    <button id="load-more-posts-btn" class="alternative-button">Show more posts</button>
  `;
}
