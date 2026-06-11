import "./styles/base.css";
import header from "./components/header.js";
import footer from "./components/footer.js";
import { renderRoute, startRouter } from "./router.js";

document.querySelector("#app").innerHTML = /*html*/ `
<section>
  ${header()}
  <main id="main-content"></main>
  ${footer()}
</section>
`;

function Main() {
  document.querySelector("#main-content").innerHTML = renderRoute();
}

startRouter(Main);
