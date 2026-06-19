import commentIcon from "../../assets/icons/comment.svg";
import reactionIcon from "../../assets/icons/reaction.svg";

function SocialCount({ count, icon, label }) {
  return /*HTML*/ `
    <a class="count-element flex center">
      <div class="flex">
        <img src="${icon}" alt="${label}">
      </div>
      <span>${count}</span>
    </a>
  `;
}

export function PostStats(counts = {}) {
  return /*html*/ `
    <section class="post-count flex gap-2">
      ${SocialCount({
        count: counts.comments,
        icon: commentIcon,
        label: "Comments",
      })}
      ${SocialCount({
        count: counts.reactions,
        icon: reactionIcon,
        label: "Reactions",
      })}
    </section>
  `;
}
