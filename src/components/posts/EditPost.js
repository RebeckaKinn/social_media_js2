import { getCurrentProfileAvatar } from "../profile/profileHeaders.js";
import { GeneralPlaceholder } from "../placeholder.js";
import { FormInput, FormTextarea } from "../forms/fields.js";
import { ImagePreview } from "./ImagePreview.js";

export async function EditPost(post) {
  const profileAvatar = await getCurrentProfileAvatar();

  return /*HTML*/ `
    <article class="bg-(--surface-color) w-full max-w-160 min-h-40 p-4 rounded-(--border-radius) shadow-[0_4px_8px_var(--shadow-color)] post-card new-post">
      <div class="flex gap-4">
        ${profileAvatar}
        <form id="edit-post-form" class="flex column gap-4">
          ${FormInput({
            labelText: "",
            id: "edit-post-title",
            name: "title",
            value: post.title || "",
            placeholder: "Title (REQUIRED)",
            isRequired: true,
          })}
          ${FormTextarea({
            labelText: "",
            id: "edit-post-body",
            name: "body",
            value: post.body || "",
            placeholder: "What's on your mind?",
          })}
          ${FormInput({
            labelText: "",
            id: "edit-media-url",
            name: "url",
            type: "url",
            value: post.media?.url || "",
            placeholder: "Image URL (max 300 characters)",
            maxlength: 300,
          })}
          ${FormInput({
            labelText: "",
            id: "edit-media-alt",
            name: "media-alt",
            value: post.media?.alt || "",
            placeholder: "Image description",
          })}
          ${ImageUploaderPreview(post)}
          ${FormInput({
            labelText: "",
            id: "edit-post-tags",
            name: "post-tags",
            value: post.tags?.join(", ") || "",
            placeholder: "Post tags (comma-separated)",
          })}
          <div class="flex row gap-4 justify-end">
            <button type="submit">save changes</button>
            <button type="button" id="cancel-edit-post">cancel</button>
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

function ImageUploaderPreview(post) {
  return /*HTML*/ `
    <section class="bg-(--surface-color) w-full max-w-160 min-h-40 p-4 rounded-(--border-radius) shadow-[0_4px_8px_var(--shadow-color)] post-card image-uploader-container flex column gap-8">
      <div id="image-url-preview-container" class="post-image">
        ${
          post.media?.url
            ? ImagePreview({
                url: post.media.url,
                alt: post.media.alt || "Post image",
              })
            : GeneralPlaceholder("Your image will be displayed here")
        }
      </div>
    </section>
  `;
}
