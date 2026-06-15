import logo from "../assets/hero.png";

export default function Header() {
  return /*html*/ `
  <header class="flex row space-between align-center">
    <div class="header-logo flex center">
        <img
            src="${logo}"
            alt=""
            loading="lazy"
        >
    </div>
    <div class="flex row">
      <input type="text" placeholder="Search..." aria-label="Search">
    </div>
    <nav aria-label="Main navigation">
      <ul class="flex row gap-2">
        <li><a href="#/">Home</a></li>
        <li><a href="#/profile">Profile</a></li>
        <li><a href="#/login">Log in</a></li>
        <li><a href="#/register">Register</a></li>
      </ul>
    </nav>
    
  </header>
  `;
}
