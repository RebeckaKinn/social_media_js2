import { getPostById } from "../api/posts.js";
import { getCurrentProfileAvatar } from "../components/profile/profileHeaders.js";
import { createPostCard } from "../components/posts/PostCard.js";
import { showModal } from "../components/modal.js";
import { NewPost } from "../components/posts/NewPost.js";

export async function showPostModal(postId) {
  try {
    const [result, currentProfileAvatar] = await Promise.all([
      getPostById(postId),
      getCurrentProfileAvatar(),
    ]);
    const post = result.data;
    showModal(createPostCard(post, true, currentProfileAvatar));
  } catch (error) {
    console.error("Failed to load post:", error);
  }
}

export async function showNewPostSection() {
  const newPost = document.querySelector("#new-post");
  if (!newPost) return;
  const newPostSection = await NewPost();
  newPost.innerHTML = newPostSection;
}
