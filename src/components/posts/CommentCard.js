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
    <article class="post-card" data-post-id="${id}">
        <section class="profile-heading flex gap-1 align-center">
            ${getProfileAvatar(authorUrl, authorAlt)}
            <h3>${authorName}</h3>
        </section>
        ${PostTimestamp(timeStampCreated)}
        <p>${postBody}</p>
    </article>
    `;
}
