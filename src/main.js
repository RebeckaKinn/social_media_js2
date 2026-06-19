import "./styles/base.css";
import header, { setupHeader } from "./components/header.js";
// import footer from "./components/footer.js";
import { setupFeedPage } from "./pages/feed.js";
import { setupLoginPage, setupRegisterPage } from "./handlers/authHandlers.js";
import { getCurrentProfileAvatar } from "./pages/profile.js";
import { renderRoute, startRouter } from "./router.js";

async function Main() {
  const app = document.querySelector("#app");
  const { content, showShell } = renderRoute();
  const profileAvatar = showShell ? await getCurrentProfileAvatar() : "";

  app.innerHTML = showShell
    ? /*html*/ `
      <section class="main-parent">
        ${header(profileAvatar)}
        <main id="main-content" class="main-content flex column gap-2">${content}</main>
        
      </section>
    `
    : /*html*/ `
      <main id="main-content" class="flex column gap-2">${content}</main>
    `;

  setupHeader();
  setupFeedPage();
  setupLoginPage();
  setupRegisterPage();
}

startRouter(Main);
