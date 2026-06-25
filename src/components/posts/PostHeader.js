import { getProfileAvatar } from "../ProfileAvatar.js";
import { CloseModalButton } from "./CloseModalButton.js";
export function PostHeader({ creator, showCloseButton = false }) {
  if (!creator) return "";

  return /*html*/ `
    <section class="profile-heading flex space-between">
      <a href="#/profile/${encodeURIComponent(creator.name)}" class="flex gap-2 align-center">
        ${getProfileAvatar(creator.avatar?.url, creator.avatar?.alt)}
        <h2>${creator.name}</h2>
      </a>
      ${showCloseButton ? CloseModalButton() : ""}
    </section>
  `;
}
