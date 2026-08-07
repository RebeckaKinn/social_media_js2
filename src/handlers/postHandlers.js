import {
  createNewPost,
  deletePost,
  getPostById,
  updatePost,
} from "../api/posts.js";
import { getCurrentProfileAvatar } from "../components/profile/profileHeaders.js";
import { createPostCard } from "../components/posts/PostCard.js";
import { closeModal, showModal } from "../components/modal.js";
import { NewPost, ImagePreview } from "../components/posts/NewPost.js";
import { EditPost } from "../components/posts/EditPost.js";

export async function showPostModal(postId) {
  try {
    const [result, currentProfileAvatar] = await Promise.all([
      getPostById(postId),
      getCurrentProfileAvatar(),
    ]);
    const post = result.data;
    showModal(createPostCard(post, true, currentProfileAvatar, true));

    const editButton = document.querySelector(
      ".modal-overlay .edit-post-button",
    );
    editButton?.addEventListener("click", async () => {
      await showEditPostForm(post.id);
    });
    const deleteButton = document.querySelector(
      ".modal-overlay .delete-post-button",
    );
    deleteButton?.addEventListener("click", async () => {
      await handleDeletePost(deleteButton, { closeAfterDelete: true });
    });
  } catch (error) {
    console.error("Failed to load post:", error);
  }
}

export async function handleDeletePost(
  deleteButton,
  { closeAfterDelete = false } = {},
) {
  const postArticle = deleteButton.closest("article[data-post-id]");
  if (!postArticle) return;

  const shouldDelete = window.confirm(
    "Are you sure you want to delete this post?",
  );
  if (!shouldDelete) return;

  deleteButton.disabled = true;
  deleteButton.textContent = "Deleting...";

  try {
    const postId = postArticle.dataset.postId;
    await deletePost(postId);

    document
      .querySelectorAll("article[data-post-id]")
      .forEach((renderedPost) => {
        if (renderedPost.dataset.postId === postId) {
          renderedPost.remove();
        }
      });

    if (closeAfterDelete) {
      closeModal();
    }
  } catch (error) {
    deleteButton.disabled = false;
    deleteButton.textContent = "Delete";
    console.error("Could not delete post:", error);
  }
}

export async function showNewPostSection() {
  const newPost = document.querySelector("#new-post");
  if (!newPost) return;

  newPost.innerHTML = await NewPost();
  imagePreviewHandler();
  const form = newPost.querySelector("#new-post-form");
  const message = document.querySelector("#post-error-message");

  if (!form || !message) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    const postData = {
      title: formData.get("title").trim(),
    };

    const body = formData.get("body").trim() || "";
    const mediaUrl = formData.get("url").trim() || "";
    const mediaAlt = formData.get("media-alt").trim() || "";

    if (body) {
      postData.body = body;
    }

    if (mediaUrl) {
      postData.media = {
        url: mediaUrl,
        alt: mediaAlt,
      };
    }
    const tags = (formData.get("post-tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (tags.length > 0) {
      postData.tags = tags;
    }
    message.textContent = "";
    submitButton.disabled = true;

    try {
      const result = await createNewPost(postData);
      form.reset();

      window.location.reload();
    } catch (error) {
      message.textContent = error.message;
      console.error("Could not create post:", error);
    } finally {
      submitButton.disabled = false;
    }
  });
}

function imagePreviewHandler({
  urlSelector = "#post-media-url",
  altSelector = "#post-media-alt",
} = {}) {
  const urlInput = document.querySelector(urlSelector);
  const altInput = document.querySelector(altSelector);
  const message = document.querySelector("#post-error-message");
  const previewContainer = document.querySelector(
    "#image-url-preview-container",
  );

  if (!urlInput || !previewContainer || !message) return;

  urlInput.addEventListener("input", () => {
    const url = urlInput.value.trim();
    const alt = altInput.value.trim() || "Image preview";

    if (!url) {
      previewContainer.innerHTML = "";
      return;
    }
    if (url.length > 300) {
      message.textContent =
        "The image URL must be 300 characters or fewer. Please use a shorter public image URL.";
      return;
    }

    previewContainer.innerHTML = ImagePreview({
      url,
      alt,
    });
  });
}

export async function showEditPostForm(postId) {
  try {
    const result = await getPostById(postId);
    const post = result.data;

    showModal(await EditPost(post));

    const form = document.querySelector(".modal-overlay #edit-post-form");

    const message = document.querySelector(
      ".modal-overlay #post-error-message",
    );

    if (!form || !message) return;
    const cancelButton = document.querySelector(
      ".modal-overlay #cancel-edit-post",
    );
    cancelButton?.addEventListener("click", async () => {
      await showPostModal(postId);
    });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');

      const formData = new FormData(form);

      const postData = {
        title: formData.get("title").trim(),
        body: formData.get("body").trim(),
        tags: (formData.get("post-tags") || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const mediaUrl = formData.get("url").trim();
      const mediaAlt = formData.get("media-alt").trim();

      if (mediaUrl) {
        postData.media = {
          url: mediaUrl,
          alt: mediaAlt,
        };
      } else {
        postData.media = null;
      }

      message.textContent = "";
      submitButton.disabled = true;
      submitButton.textContent = "Saving...";

      try {
        await updatePost(postId, postData);
        const updatedResult = await getPostById(postId);
        const updatedPost = updatedResult.data;

        const renderedCards = document.querySelectorAll(
          "#posts-feed > article[data-post-id], " +
            "#profile-post-feed > article[data-post-id]",
        );

        renderedCards.forEach((card) => {
          if (card.dataset.postId === String(postId)) {
            card.outerHTML = createPostCard(updatedPost);
          }
        });

        await showPostModal(postId);
      } catch (error) {
        message.textContent = error.message;
        submitButton.disabled = false;
        submitButton.textContent = "Save changes";
        console.error("Could not update post:", error);
      }
    });
  } catch (error) {
    console.error("Could not load post for editing:", error);
  }
}
