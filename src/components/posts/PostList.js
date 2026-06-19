import { createPostCard } from "./PostCard.js";

export function PostList(posts = []) {
  return posts.map((post) => createPostCard(post)).join("");
}
