import "./styles/base.css";
import header, { setupHeader } from "./components/header.js";
import footer from "./components/footer.js";
import { renderRoute, startRouter } from "./router.js";

document.querySelector("#app").innerHTML = /*html*/ `
<section class="flex column">
  ${header()}
  <main id="main-content" class="flex column gap-2"></main>
  ${footer()}
</section>
`;

setupHeader();

function Main() {
  document.querySelector("#main-content").innerHTML = renderRoute();
}

startRouter(Main);
