import { getCurrentProfileAvatar } from "../profile/profileHeaders.js";
import { CloseModalButton } from "./CloseModalButton.js";

export async function NewPost() {
  const profileAvatar = await getCurrentProfileAvatar();

  return /*HTML*/ `
  <article class="post-card new-post">
        <div class="flex gap-1">
          ${profileAvatar}
          <textarea
                id="new-post-content"
                name="post"
                placeholder="What's on your mind?"
          ></textarea>
        </div>
        <div>
            <button id="post-image-uploader">upload image</button>
            <button>post</button>
        </div>
      </article>
  `;
}

export function ImageUploaderPopUp() {
  return /*HTML*/ `
    <section class="post-card new-post">
      ${CloseModalButton()}
      <div>
        <span for="content-image">Upload image</span>
        <input id="content-image" type="file" accept="image/*">
      </div>
      <img id="filePreview" src="" alt="File Preview">
    </section>
  `;
}
