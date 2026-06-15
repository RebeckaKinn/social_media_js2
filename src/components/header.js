import logo from "../assets/hero.png";

export default function Header() {
  return /*html*/ `
  <header>
    <button
      class="menu-toggle"
      type="button"
      aria-label="Open navigation menu"
      aria-controls="main-navigation"
      aria-expanded="false"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav id="main-navigation" class="header-nav" aria-label="Main navigation">
      <div class="header-search flex row align-center">
        <img class="header-search-logo" src="${logo}" alt="" loading="lazy">
        <input id="search" class="header-search-input" type="search" placeholder="Search..." aria-label="Search">
      </div>
      <ul class="flex row gap-2">
        <li><a href="#/">HOME</a></li>
        <li><a href="#/profile">PROFILE</a></li>
        <li><a href="#/login">LOGIN</a></li>
        <li><a href="#/register">REGISTER</a></li>
      </ul>
    </nav>
    
  </header>
  `;
}

export function setupHeader() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".header-nav");

  if (!menuToggle || !navigation) return;

  function closeMenu() {
    navigation.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
