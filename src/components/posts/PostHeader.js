import { getProfileAvatar } from "../ProfileAvatar.js";
import { CloseModalButton } from "./CloseModalButton.js";

export function PostHeader({ creator, showCloseButton = false }) {
  if (!creator) return "";

  return /*HTML*/ `
    <section class="pb-8 flex justify-between">
      <a
        href="#/profile/${encodeURIComponent(creator.name)}"
        class="flex gap-2 align-center"
      >
        ${getProfileAvatar(creator.avatar?.url, creator.avatar?.alt)}
        <h2 class="m-0">${creator.name}</h2>
      </a>
      ${showCloseButton ? CloseModalButton() : ""}
    </section>
  `;
}
