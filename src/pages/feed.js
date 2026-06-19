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
