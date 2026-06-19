import { FormInput, FormTextarea } from "../components/forms/fields.js";

export default function RegisterPage() {
  return /*html*/ `
    <section class="form flex justify-center" aria-labelledby="register-heading">
      <div class="form-container flex column align-center">  
        <h1>pinkripple</h1>
        <p>Create an account to join the community.</p>

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
            <button type="submit">Register</button>
            <span class="small-txt flex column center">
              <div>Already have an account?</div>
              <a href="#/login">Log in here!</a>
            </span>
            <p id="register-message" class="small-txt" role="status" aria-live="polite"></p>
  
        </form>
      </div>
    </section>
  `;
}
