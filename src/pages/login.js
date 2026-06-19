import { FormInput } from "../components/forms/fields.js";

export default function LoginPage() {
  return /*html*/ `
    <section class="form flex justify-center" aria-labelledby="login-heading">
      <div class="form-container flex column align-center">  
        <h1>pinkripple</h1>
        <p>Log in to view and share posts.</p>

        <form id="login-form" class="flex column gap-1">
          ${FormInput({
            labelText: "Email",
            id: "login-email",
            name: "email",
            type: "email",
            autocomplete: "email",
            placeholder: "first.last@stud.noroff.no",
            isRequired: true,
          })}
          ${FormInput({
            labelText: "Password",
            id: "login-password",
            name: "password",
            type: "password",
            autocomplete: "current-password",
            placeholder: "Enter your password",
            isRequired: true,
          })}

          <button type="submit">Log in</button>
          <span class="small-txt flex column center">
            <div>Don't have an account?</div>
            <a href="#/register">Register here!</a>
          </span>
            <p id="login-message" class="small-txt" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
}
