import { getProfileAvatar } from "../ProfileAvatar.js";
import { PostHeader } from "./PostHeader.js";
import { PostStats } from "./PostStats.js";
import { PostTags } from "./PostTags.js";
import { ShowCommentSection } from "./CommentSection.js";
import { PostTimestamp } from "./PostTimestamp.js";
import { getCurrentLogInCredentials } from "../../api/auth.js";
/*

  ],
  "reactions": [
    {
      "symbol": "👍",
      "count": 1,
      "reactors": ["Nicklasoeen"]
    }
  ]
}
*/
export function createPostCard(
  post,
  additionalInfo = false,
  currentProfileAvatar = getProfileAvatar(),
  showDeleteButton = false,
) {
  const imageUrl = post.media?.url || "";
  const imageAlt = post.media?.alt || post.title || "Post image";
  const creatorInfo = additionalInfo
    ? PostHeader({ creator: post.author, showCloseButton: true })
    : "";
  const commentSection = additionalInfo
    ? ShowCommentSection(post.id, post.comments, currentProfileAvatar)
    : "";
  const { userName } = getCurrentLogInCredentials();
  const isOwnPost = post.author?.name === userName;

  return /*html*/ `
    <article data-post-id="${post.id}" class="post-card">
    ${
      showDeleteButton && isOwnPost
        ? /*HTML*/ `<button
         type="button"
         class="delete-post-button"
         aria-label="Delete ${post.title || "post"}"
       >
         Delete
       </button>`
        : ""
    }
      ${creatorInfo}
      
      <section class="flex column">
        <h3 class="post-title">${post.title || "Untitled"}</h3>
      </section>

      <section>
        <p>${post.body || ""}</p>
        ${
          imageUrl != ""
            ? /*HTML*/ `
          <div class="post-image">
            <img src="${imageUrl}" alt="${imageAlt}" loading="lazy">
          </div>
          `
            : ""
        }
        ${PostTimestamp(post.created, post.updated)}
      </section>
      ${PostTags(post.tags)}
      ${PostStats(post._count)}
      
      ${commentSection}
    </article>
  `;
}
