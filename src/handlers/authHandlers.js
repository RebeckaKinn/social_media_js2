import { login, register } from "../api/auth.js";

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
