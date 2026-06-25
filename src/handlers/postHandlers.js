import { getPostById } from "../api/posts.js";
import { getCurrentProfileAvatar } from "../components/profile/profileHeaders.js";
import { createPostCard } from "../components/posts/PostCard.js";
import { showModal } from "../components/modal.js";
import {
  NewPost,
  ImageUploaderPopUp,
  ImagePreview,
} from "../components/posts/NewPost.js";

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

  const imageUploader = document.querySelector("#post-image-uploader");
  imageUploader.addEventListener("click", (event) => {
    event.preventDefault();
    const popUp = ImageUploaderPopUp();
    showModal(popUp);
    imagePreviewHandler();
  });
}

function imagePreviewHandler() {
  const fileInput = document.querySelector("#content-image");
  const filePreview = document.querySelector("#filePreview");
  let saveableUrlString = "";
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        saveableUrlString = e.target.result;
        filePreview.innerHTML = ImagePreview({
          url: saveableUrlString,
          alt: "Image preview",
        });
      };
      reader.readAsDataURL(file);
    }
  });
}
