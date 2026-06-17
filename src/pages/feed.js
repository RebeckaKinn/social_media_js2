import { getPosts } from "../api/posts.js";
import LoadingPost from "../components/loading.js";
import Fallback from "./fallback.js";
import commentIcon from "../assets/icons/comment.svg";
import reactionIcon from "../assets/icons/reaction.svg";

export default function FeedPage() {
  return /*html*/ `
    <h1>pinkripple</h1>
    <h2>Welcome to pinkripple!</h2>
    <p>Explore the latest posts and connect with your network.</p>
    ${LoadingPost()}
    <section id="posts-feed" class="flex column align-center gap-2" aria-live="polite">
    </section>
  `;
}

async function loadPosts(page = 1, limit = 10) {
  const result = await getPosts(page, limit);
  return result.data;
}
/**
 * Sets up the feed page by loading and displaying posts.
 * Has fallback if there is an issue with fetching the posts, as well as
 * loading per post.
 */
export function setupFeedPage() {
  const postsFeed = document.querySelector("#posts-feed");
  const page = 1;
  const limit = 10;

  if (!postsFeed) return;

  postsFeed.innerHTML = Array.from({ length: limit }, () => LoadingPost()).join(
    "",
  );

  loadPosts(page, limit)
    .then((posts) => {
      postsFeed.innerHTML = posts.map(createPostCard).join("");
    })
    .catch((error) => {
      postsFeed.innerHTML = Fallback({
        title: "Could not load posts",
        message: error.message,
      });
    });
}

function createPostCard(post) {
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

/*
{
      "id": 0,
      "title": "string",
      "body": "string",
      "tags": ["string"],
      "media": {
        "url": "https://url.com/image.jpg",
        "alt": "string"
      },
      "created": "2022-09-04T08:08:38.830Z",
      "updated": "2022-09-04T08:08:38.830Z",
      "_count": {
        "comments": 0,
        "reactions": 0
      }
    },
*/

/*
for clicking the post to open it. 

article.addEventListener("click", () => {
  const postId = article.dataset.postId;
  window.location.hash = `#/post/${postId}`;
});
*/
