export default function ProfilePage() {
  return /*HTML*/ `
    <section id="profile-banner" class="flex center"></section>
    <section id="profile-info" class="flex center"></section>
    <section id="profile-bio" class="flex center"></section>
    <section id="new-post" class="flex column align-center"></section>
    <section id="profile-post-feed" class="flex column align-center gap-2" aria-live="polite">
    </section>
    <button id="load-more-posts-btn" class="alternative-button">Show more posts</button>
  `;
}
