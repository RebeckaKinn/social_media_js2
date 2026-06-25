import { CloseModalOriginalButton } from "../posts/CloseModalButton.js";
import { FormInput, FormTextarea } from "../forms/fields.js";

export function EditProfile() {
  return /*HTML*/ `
    <section class="post-card image-uploader-container flex column gap-2">
        <h3>Edit profile</h3>
        <form id="register-form" class="flex column gap-1">
          ${FormInput({
            labelText: "Name*",
            id: "register-name",
            name: "name",
            type: "text",
            autocomplete: "name",
            placeholder: "my_username",
            isRequired: true,
          })}
          ${FormInput({
            labelText: "Email*",
            id: "register-email",
            name: "email",
            type: "email",
            autocomplete: "email",
            placeholder: "first.last@stud.noroff.no",
            isRequired: true,
          })}
          ${FormInput({
            labelText: "Password*",
            id: "register-password",
            name: "password",
            type: "password",
            autocomplete: "current-password",
            placeholder: "Enter your password",
            isRequired: true,
          })}
          ${FormTextarea({
            labelText: "Bio",
            id: "register-bio",
            name: "bio",
            placeholder: "Tell us about yourself",
          })}
          ${FormInput({
            labelText: "Profile image URL",
            id: "register-avatar-url",
            name: "avatarUrl",
            type: "url",
            placeholder: "https://img.service.com/avatar.jpg",
          })}
            <span class="small-txt italic">* Required fields</span>

            <div class="flex row gap-1 justify-end">
              <button type="submit">save</button>
              ${CloseModalOriginalButton()}
            </div>
        </form>
        </section>
    
    `;
}
