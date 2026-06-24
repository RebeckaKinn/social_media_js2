import { showPostModal, showNewPostSection } from "./postHandlers.js";

export function setupProfilePage() {
  const banner = document.querySelector("#profile-banner");
  const bio = document.querySelector("#profile-bio");
  const info = document.querySelector("#profile-info");
  const feed = document.querySelector("#profile-post-feed");

  if (!banner) return;
  showNewPostSection();
}
