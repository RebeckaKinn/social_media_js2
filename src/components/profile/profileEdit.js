import { CloseModalOriginalButton } from "../posts/CloseModalButton.js";
import { FormInput, FormTextarea } from "../forms/fields.js";

export function EditProfile() {
  return /*HTML*/ `
    <section class="post-card image-uploader-container flex column gap-2">

          <div class="flex row gap-1 justify-end">
            <button>save</button>
            ${CloseModalOriginalButton()}
          </div>
        </section>
    
    `;
}
