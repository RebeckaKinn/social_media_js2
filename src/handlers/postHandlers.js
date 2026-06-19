import { getPostById } from "../api/posts.js";
import { getCurrentProfileAvatar } from "../pages//profile.js";
import { createPostCard } from "../components/posts/PostCard.js";
import { showModal } from "../components/modal.js";

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
