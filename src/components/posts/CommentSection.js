import { getProfileAvatar } from "../ProfileAvatar.js";
import { CommentCard } from "./CommentCard.js";

export function ShowCommentSection(
  postId,
  comments = [],
  currentProfileAvatar = getProfileAvatar(),
) {
  let commentSection = "";
  if (comments.length > 0) {
    comments.forEach((c) => {
      if (c.postId !== postId) return;
      commentSection += CommentCard({
        id: c.id,
        authorName: c.author.name,
        authorUrl: c.author?.avatar?.url,
        authorAlt: c.author?.avatar?.alt,
        timeStampCreated: c.created,
        postBody: c.body,
      });
    });
  }
  return /*HTML*/ `
    <section class="comment-section flex column gap-1">
      <div class="new-comment flex column">
        <div class="flex gap-1">
          ${currentProfileAvatar}
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
