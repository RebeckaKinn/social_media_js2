import { getCurrentLogInCredentials } from "../api/auth.js";
import { NewPostButton } from "../components/NewPostButton.js";

export default function FeedPage() {
  const user = getCurrentLogInCredentials();
  return /*HTML*/ `
    <h1 id="feed-title" class="text-(length:--font-size-h3) text-(--color-primary) w-full max-w-160">Welcome ${user.userName}</h1>
    ${NewPostButton()}
    <section id="posts-feed" class="flex flex-col items-center gap-8 w-full max-w-160" aria-live="polite">
    </section>
    <button id="load-more-posts-btn" class="
      self-center
      w-full
      max-w-[20rem]
      bg-(--surface-color)
      text-(--text-color)
      shadow-[0_4px_8px_var(--shadow-color)]"
      >Show more posts</button>
  `;
}
