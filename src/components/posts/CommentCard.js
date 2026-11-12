import { getProfileAvatar } from "../ProfileAvatar.js";
import { PostTimestamp } from "./PostTimestamp.js";

export function CommentCard({
  id,
  authorName,
  authorUrl,
  authorAlt,
  timeStampCreated,
  postBody,
}) {
  return /*HTML*/ `
    <article class="bg-(--surface-color) w-full max-w-160 min-h-40 p-4 rounded-(--border-radius) shadow-[0_4px_8px_var(--shadow-color)]" data-post-id="${id}">
      <a
        href="#/profile/${encodeURIComponent(authorName)}"
        class="profile-heading flex gap-4 items-center"
      >
        ${getProfileAvatar(authorUrl, authorAlt)}
        <h3>${authorName}</h3>
      </a>
      ${PostTimestamp(timeStampCreated)}
      <p>${postBody}</p>
    </article>
  `;
}
