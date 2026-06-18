import commentIcon from "../assets/icons/comment.svg";
import reactionIcon from "../assets/icons/reaction.svg";

export default function PostPage({ id } = {}) {
  return /*html*/ `
    <h1>Post</h1>
    <p>Viewing post ${id ?? ""}.</p>
  `;
}

export function createPostCard(post) {
  const imageUrl = post.media?.url || "";
  const imageAlt = post.media?.alt || post.title || "Post image";

  return /*html*/ `
    <article data-post-id="${post.id}" class="post-card">

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
