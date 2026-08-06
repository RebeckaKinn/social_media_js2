import { createPostCard } from "./PostCard.js";

export function PostList(posts = [], showDeleteButton = false) {
  return posts
    .map((post) => createPostCard(post, false, undefined, showDeleteButton))
    .join("");
}
