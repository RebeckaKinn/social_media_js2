import { getCurrentProfileAvatar } from "../profile/profileHeaders.js";
import { GeneralPlaceholder } from "../placeholder.js";
import { FormInput, FormTextarea } from "../forms/fields.js";

export async function NewPost() {
  const profileAvatar = await getCurrentProfileAvatar();

  return /*HTML*/ `
    <article class="post-card new-post">
      <div class="flex gap-4">
        ${profileAvatar}
        <form id="new-post-form" class="flex column gap-4">
          ${FormInput({
            labelText: "",
            id: "new-post-title",
            name: "title",
            placeholder: "Title (REQUIRED)",
            isRequired: true,
          })}
          ${FormTextarea({
            labelText: "",
            id: "new-post-body",
            name: "body",
            placeholder: "What's on your mind?",
          })}
          ${FormInput({
            labelText: "",
            id: "post-media-url",
            name: "url",
            type: "url",
            placeholder: "Image URL (max 300 characters)",
            maxlength: 300,
          })}
          ${FormInput({
            labelText: "",
            id: "post-media-alt",
            name: "media-alt",
            placeholder: "Image description",
          })}
          ${ImageUploaderPreview()}
          ${FormInput({
            labelText: "",
            id: "post-tags",
            name: "post-tags",
            placeholder: "Post tags (comma-separated)",
          })}
          <div class="flex row gap-4 justify-end">
            <button type="submit">post</button>
          </div>
        </form>
        <p
          id="post-error-message"
          class="small-txt"
          role="status"
          aria-live="polite"
        ></p>
      </div>
    </article>
  `;
}

function ImageUploaderPreview() {
  return /*HTML*/ `
    <section class="post-card image-uploader-container flex column 8">
      <div id="image-url-preview-container" class="post-image">
        ${GeneralPlaceholder("Your image will be displayed here")}
      </div>
    </section>
  `;
}
