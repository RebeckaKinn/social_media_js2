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
    <section class="post-card new-post image-uploader-container">
     <section class="profile-heading flex space-between">
          <h3>Upload image</h3>
          ${CloseModalButton()}
        </section>
      <div>
        <input id="content-image" type="file" accept="image/*">
      </div>
      <div id="filePreview" class="post-image">
         ${ImagePrewviewPlaceholder()}
      </div>
    </section>
  `;
}

function ImagePrewviewPlaceholder() {
  return /*HTML*/ `
    <p>Your image will be displayed here</p>
  `;
}

export function ImagePreview({ url = "", alt = "" }) {
  return /*HTML*/ `
    <img id="filePreview" src="${url}" alt="${alt}" loading="lazy">
  `;
}
