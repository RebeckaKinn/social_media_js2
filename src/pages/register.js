import { register } from "../api/auth.js";

export default function RegisterPage() {
  return /*html*/ `
    <section class="form flex justify-center" aria-labelledby="register-heading">
      <div class="form-container flex column align-center">  
        <h1>pinkripple</h1>
        <p>Create an account to join the community.</p>

        <form id="register-form" class="flex column gap-1">
          <div class="flex column">
            <label for="register-name">Name</label>
              <input
                id="register-name"
                name="name"
                type="text"
                autocomplete="name"
                placeholder="my_username"
                required
              >
            </div>

            <div class="flex column">
              <label for="register-email">Email</label>
              <input
                id="register-email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="first.last@stud.noroff.no"
                required
              >
            </div>

            <div class="flex column">
              <label for="register-password">Password</label>
              <input
                id="register-password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                required
              >
            </div>

            <div class="flex column">
              <label for="register-bio">Bio</label>
              <textarea
                id="register-bio"
                name="bio"
                type="text"
                placeholder="Tell us about yourself"
                optional
              ></textarea>
            </div>

            <div class="flex column">
              <label for="register-avatar-url">Profile image URL</label>
              <input
                id="register-avatar-url"
                name="avatarUrl"
                type="url"
                placeholder="https://img.service.com/avatar.jpg"
              >
            </div>

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

export function setupRegisterPage() {
  const form = document.querySelector("#register-form");
  const message = document.querySelector("#register-message");

  if (!form || !message) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    message.textContent = "";
    submitButton.disabled = true;
    submitButton.textContent = "Registering...";

    try {
      await register(
        formData.get("name"),
        formData.get("email"),
        formData.get("password"),
        formData.get("bio"),
        formData.get("avatarUrl"),
      );
      window.location.hash = "#/login";
    } catch (error) {
      message.textContent = error.message;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Register";
    }
  });
}
