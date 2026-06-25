import "./styles/base.css";
import header, { setupHeader } from "./components/header.js";
// import footer from "./components/footer.js";
import { setupFeedPage } from "./handlers/feedHandlers.js";
import { setupLoginPage, setupRegisterPage } from "./handlers/authHandlers.js";
import { getCurrentProfileAvatar } from "./components/profile/profileHeaders.js";
import { renderRoute, startRouter } from "./router.js";
import { setupProfilePage } from "./handlers/profileHandlers.js";
import { closeModal } from "./components/modal.js";

async function Main() {
  closeModal();

  const app = document.querySelector("#app");
  const { content, showShell } = renderRoute();
  const profileAvatar = showShell ? await getCurrentProfileAvatar() : "";

  app.innerHTML = showShell
    ? /*html*/ `
      <section class="main-parent">
        ${header(profileAvatar)}
        <main id="main-content" class="main-content flex column align-center gap-2">${content}</main>
        
      </section>
    `
    : /*html*/ `
      <main id="main-content" class="flex column gap-2">${content}</main>
    `;

  setupHeader();
  setupFeedPage();
  setupProfilePage();
  setupLoginPage();
  setupRegisterPage();
}

startRouter(Main);
