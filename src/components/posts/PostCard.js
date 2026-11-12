import { getProfileAvatar } from "../ProfileAvatar.js";
import { PostHeader } from "./PostHeader.js";
import { PostStats } from "./PostStats.js";
import { PostTags } from "./PostTags.js";
import { ShowCommentSection } from "./CommentSection.js";
import { PostTimestamp } from "./PostTimestamp.js";
import { getCurrentLogInCredentials } from "../../api/auth.js";

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
    ? ShowCommentSection(post.id, post.comments)
    : "";
  const { userName } = getCurrentLogInCredentials();
  const isOwnPost = post.author?.name === userName;

  return /*HTML*/ `
    <article data-post-id="${post.id}" class="post-card">
      ${
        showDeleteButton && isOwnPost
          ? /*HTML*/ `
            <div>
              <button
                type="button"
                id="delete-post-button"
                class="bg-(--shadow-color) text-(--text-color) text-(length:--font-size-small) font-normal mb-2"
                aria-label="Delete ${post.title || "post"}"
              >
                Delete
              </button>
              <button
                type="button"
                id="edit-post-button"
                class="bg-(--color-primary) text-inherit text-(length:--font-size-small) font-normal mb-2"
                aria-label="Edit ${post.title || "post"}"
              >
                Edit
              </button>
            </div>
          `
          : ""
      }
      ${creatorInfo}

      <section class="flex flex-col">
        <h3 class="font-medium m-0">${post.title || "Untitled"}</h3>
      </section>

      <section>
        <p>${post.body || ""}</p>
        ${
          imageUrl != ""
            ? /*HTML*/ `
              <div>
                <img class="object-contain" src="${imageUrl}" alt="${imageAlt}" loading="lazy">
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
