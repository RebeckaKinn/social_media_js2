import "./styles/base.css";
import header, { setupHeader } from "./components/header.js";
import footer from "./components/footer.js";
import { setupFeedPage } from "./pages/feed.js";
import { setupLoginPage } from "./pages/login.js";
import { setupRegisterPage } from "./pages/register.js";
import { renderRoute, startRouter } from "./router.js";

function Main() {
  const app = document.querySelector("#app");
  const { content, showShell } = renderRoute();

  app.innerHTML = showShell
    ? /*html*/ `
      <section class="flex column">
        ${header()}
        <main id="main-content" class="main-content flex column gap-2">${content}</main>
        ${footer()}
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
