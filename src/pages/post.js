import commentIcon from "../assets/icons/comment.svg";
import reactionIcon from "../assets/icons/reaction.svg";
import { getProfileAvatar } from "./profile.js";

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
export function createPostCard(post, additionalInfo = false) {
  const imageUrl = post.media?.url || "";
  const imageAlt = post.media?.alt || post.title || "Post image";
  const creatorInfo = additionalInfo ? showCreatorInfo(post.author) : "";
  const commentSection = additionalInfo
    ? showCommentSection(post.id, post.comments)
    : "";
  return /*html*/ `
    <article data-post-id="${post.id}" class="post-card">
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
        <section class="post-timestamp flex">
            <div>
              <span>created:</span>
              <span>${formatDate(post.created)}</span>
            </div>
             ${
               !checkIsUpdated(post.created, post.updated)
                 ? /*HTML*/ `
              <span class="separator">|</span>
              <div>
                <span>updated:</span>
                <span>${formatDate(post.updated)}</span>
              </div>
            `
                 : ""
             }
        </section>
      </section>
      <section>
        <ul class="post-tags flex gap-1">${generateTags(post.tags)}</ul>
      </section>
      <section class="post-count flex gap-2">
        ${generateSocialCount(post._count.comments, commentIcon, "Comments")}
        ${generateSocialCount(post._count.reactions, reactionIcon, "Reactions")}
      </section>

      ${commentSection}
    </article>
  `;
}
function generateSocialCount(count, imgSrc, imgAlt) {
  return /*HTML*/ `
    <a class="count-element flex center">
      <div class="flex">
        <img src="${imgSrc}" alt="${imgAlt}" class="icon">
      </div>
      <span>${count}</span>
    </a>
  `;
}

function checkIsUpdated(created, updated) {
  return Boolean(created == updated);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function generateTags(list) {
  return list
    .map(
      (e) => /*HTML*/ `
      <li class="small-txt italic">#${e}</li>
    `,
    )
    .join("");
}

function showCreatorInfo(creator) {
  if (!creator) return;
  return /*HTML*/ `
    <section class="profile-heading flex gap-2 align-center">
      ${getProfileAvatar(creator.avatar?.url, creator.avatar?.alt)}
      <h2>${creator.name}</h2>
    </section>
  `;
}

function showCommentSection(postId, comments = []) {
  let commentSection = "";
  if (comments.length > 0) {
    comments.forEach((c) => {
      if (c.postId !== postId) return;
      commentSection += /*HTML*/ `
      <article class="post-card" data-post-id="${c.id}">
        <section class="profile-heading flex gap-1 align-center">
          ${getProfileAvatar(c.author?.avatar?.url, c.author?.avatar?.alt)}
          <h3>${c.author.name}</h3>
        </section>
        <section class="post-timestamp flex">
           <div>
             <span>created:</span>
             <span>${formatDate(c.created)}</span>
           </div>
       </section>
        <p>${c.body}</p>
      </article>
      `;
    });
  }
  return /*HTML*/ `
    <section class="comment-section flex column gap-1">
      <div class="new-comment flex column">
        <div class="flex gap-1">
          ${getProfileAvatar()}
          <textarea
                id="new-post"
                name="post"
                type="text"
                placeholder="What's on your mind?"
                optional
          ></textarea>
        </div>
        <button>comment</button>
      </div>
    ${commentSection}
    </section>
  `;
}
