import { login } from "../api/auth.js";

export default function LoginPage() {
  return /*html*/ `
    <section class="form flex justify-center" aria-labelledby="login-heading">
      <div class="form-container flex column align-center">  
        <h1>pinkripple</h1>
        <p>Log in to view and share posts.</p>

        <form id="login-form" class="flex column gap-1">
          <div class="flex column">
            <label for="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="first.last@stud.noroff.no"
              required
            >
          </div>

          <div class="flex column">
            <label for="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="Enter your password"
              required
            >
          </div>

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

export function setupLoginPage() {
  const form = document.querySelector("#login-form");
  const message = document.querySelector("#login-message");

  if (!form || !message) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    message.textContent = "";
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    try {
      await login(formData.get("email"), formData.get("password"));
      window.location.hash = "#/";
    } catch (error) {
      message.textContent = error.message;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Log in";
    }
  });
}
