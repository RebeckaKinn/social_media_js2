import { getCurrentProfileAvatar } from "../profile/profileHeaders.js";
import { CloseModalOriginalButton } from "./CloseModalButton.js";
import { GeneralPlaceholder } from "../placeholder.js";
import { FormInput, FormTextarea } from "../forms/fields.js";

export async function NewPost() {
  const profileAvatar = await getCurrentProfileAvatar();

  return /*HTML*/ `
  <article class="post-card new-post">
        <div class="flex gap-1">
          ${profileAvatar}
          <form class="flex column gap-1">
          ${FormInput({
            labelText: "",
            id: "new-post-title",
            name: "new-title",
            placeholder: "Title",
          })}
          ${FormTextarea({
            labelText: "",
            id: "new-post-body",
            name: "new-post",
            placeholder: "What's on your mind?",
          })}
          </form>
        </div>
        <div class="flex row gap-1 justify-end">
            <button id="post-image-uploader">upload image</button>
            <button>post</button>
        </div>
      </article>
  `;
}

export function ImageUploaderPopUp() {
  return /*HTML*/ `
    <section class="post-card image-uploader-container flex column gap-2">
          <h3>Upload image</h3>
      <div class="flex">
        <label for="content-image" class="file-upload-button">Upload image</label>
        <input id="content-image" type="file" accept="image/*">
      </div>
      <div id="filePreview" class="post-image">
         ${GeneralPlaceholder("Your image will be displayed here")}
      </div>
      <div class="flex row gap-1 justify-end">
        <button>save</button>
        ${CloseModalOriginalButton()}
      </div>
    </section>
  `;
}

export function ImagePreview({ url = "", alt = "" }) {
  return /*HTML*/ `
    <img id="filePreview" src="${url}" alt="${alt}" loading="lazy">
  `;
}
