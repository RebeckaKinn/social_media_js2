import { getCurrentLogInCredentials } from "../api/auth.js";
import { NewPostButton } from "../components/NewPostButton.js";

export default function FeedPage() {
  const user = getCurrentLogInCredentials();
  return /*html*/ `
    <h1 class="feed-title">Welcome ${user.userName}</h1>
    ${NewPostButton()}
    <section id="posts-feed" class="flex column align-center gap-2" aria-live="polite">
    </section>
    <button id="load-more-posts-btn" class="alternative-button">Show more posts</button>
  `;
}
