import commentIcon from "../assets/icons/comment.svg";
import reactionIcon from "../assets/icons/reaction.svg";

/*
{
  "author": {
    "name": "Spellemann",
    "email": "PerSpellemann@stud.noroff.no",
    "bio": "From pres.",
    "avatar": {
      "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
      "alt": ""
    },
    "banner": {
      "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
      "alt": ""
    }
  },
  "comments": [
    {
      "id": 5164,
      "body": "test",
      "created": "2026-06-10T12:15:21.938Z",
      "postId": 10586,
      "owner": "Nicklasoeen",
      "replyToId": null,
      "author": {
        "name": "Nicklasoeen",
        "email": "nicoee05516@stud.noroff.no",
        "bio": "I am a front-end developer in training, learning about APIs!",
        "avatar": { "url": "...", "alt": "" },
        "banner": { "url": "...", "alt": "" }
      }
    }
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
