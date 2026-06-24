import { getCurrentProfileAvatar } from "../profile/profileHeaders.js";

export async function NewPost() {
  const profileAvatar = await getCurrentProfileAvatar();

  return /*HTML*/ `
  <div class="post-card new-post flex column">
        <div class="flex gap-1">
          ${profileAvatar}
          <textarea
                id="new-post"
                name="post"
                type="text"
                placeholder="What's on your mind?"
                optional
          ></textarea>
        </div>
        <div>
            <span for="post-image-upload">Upload image</span>
            <input id="post-image-upload" type="url">
            <button>comment</button>
        </div>
      </div>
  `;
}

function openImageUploader() {}
