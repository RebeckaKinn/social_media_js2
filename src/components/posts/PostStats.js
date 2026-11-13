import commentIcon from "../../assets/icons/comment.svg";
import reactionIcon from "../../assets/icons/reaction.svg";

function SocialCount({ count, icon, label }) {
  return /*HTML*/ `
    <a class="gap-[0.3rem] mt-4 text-(--text-color) flex justify-center items-center">
      <div class="flex aspect-square w-6">
        <img src="${icon}" alt="${label}">
      </div>
      <span class="text-(--text-color)">${count}</span>
    </a>
  `;
}

export function PostStats(counts = {}) {
  return /*HTML*/ `
    <section class="flex gap-8">
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
