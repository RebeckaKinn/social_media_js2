import { CommentCard } from "./CommentCard.js";
import { GeneralPlaceholder } from "../placeholder.js";

export function ShowCommentSection(postId, comments = []) {
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
  } else {
    commentSection = GeneralPlaceholder("No comments on this post yet.");
  }
  return /*HTML*/ `
    <section class="comment-section flex column gap-1">
      
    ${commentSection}
    </section>
  `;
}
