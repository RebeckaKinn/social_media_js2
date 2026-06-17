import logo from "../assets/hero.png";
import { logout } from "../api/auth.js";
import footer from "./footer.js";
let headerController;

export default function Header() {
  return /*html*/ `
  <header class="flex">
  <div class="header-search flex row align-center">
        <img class="header-search-logo" src="${logo}" alt="" loading="lazy">
        <input id="search" class="header-search-input" type="search" placeholder="Search..." aria-label="Search">
      </div>
    <button
      class="menu-toggle"
      type="button"
      aria-label="Open navigation menu"
        aria-controls="main-menu"
      aria-expanded="false"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div id="main-menu" class="header-menu">
      <nav id="main-navigation" class="header-nav" aria-label="Main navigation">
      
      <ul class="flex row gap-2">
        <li><a href="#/profile">PROFILE</a></li>
        <li><a href="#/">FEED</a></li>
        <li><a id="logout-link" href="#/login">LOGOUT</a></li>
      </ul>
      </nav>
      ${footer()}
    </div>
  </header>
  `;
}
/**
 * Sets up event listeners for the header menu functionality.
 *
 * Manages the mobile menu toggle, navigation link clicks, logout handler,
 * and keyboard escape key. Uses AbortController to clean up previous listeners
 * before adding new ones, preventing duplicate event listeners when the header
 * is re-rendered on route changes.
 */
export function setupHeader() {
  headerController?.abort();
  headerController = new AbortController();

  const menuToggle = document.querySelector(".menu-toggle");
  const menuContainer = document.querySelector(".header-menu");
  const navigation = document.querySelector(".header-nav");
  const logoutLink = document.querySelector("#logout-link");

  if (!menuToggle || !navigation || !menuContainer) return;

  const { signal } = headerController;

  function closeMenu() {
    menuContainer.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener(
    "click",
    () => {
      const isOpen = menuContainer.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    },
    { signal },
  );

  navigation.addEventListener(
    "click",
    (event) => {
      if (event.target.closest("a")) closeMenu();
    },
    { signal },
  );

  logoutLink?.addEventListener(
    "click",
    () => {
      logout();
    },
    { signal },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") closeMenu();
    },
    { signal },
  );
}
