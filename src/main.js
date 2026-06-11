import "./styles/base.css";
import header from "./components/header.js";
import footer from "./components/footer.js";

document.querySelector("#app").innerHTML = /*html*/ `
<section>
  ${header()}
  ${Main()}
  ${footer()}
</section>
`;

function Main() {
  return /*html*/ `
  <main>
    <h1>Social Media App</h1>
    <h2>Welcome to the Social Media App!</h2>
    <h3>Connect with friends and share your moments.</h3>
    <p>Explore the latest posts, like and comment on your favorite content, and stay updated with your network.</p>
    <button>Get Started</button>
    <a href="#">Learn More</a>
  </main>
  `;
}
