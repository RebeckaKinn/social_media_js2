import { getCurrentProfileAvatar } from "../components/profile/profileHeaders.js";

export default function ProfilePage() {
  return /*html*/ `
    <section id="profile-banner">
      profile header with banner, avatar and name
    </section>
    <section id="profile-bio">bio info</section>
    <section id="profile-info">more info?</section>
    <section id="new-post">create post</section>
    <section id="profile-post-feed">my earlier posts</section>
  `;
}
