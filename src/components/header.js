import logo from "../assets/hero.png";

export default function Header() {
  return /*html*/ `
  <header>
    <div>
        <img
            src="${logo}"
            alt=""
            loading="lazy"
        >
    </div>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#/">Home</a></li>
        <li><a href="#/profile">Profile</a></li>
        <li><a href="#/login">Log in</a></li>
        <li><a href="#/register">Register</a></li>
      </ul>
    </nav>
    <div>search</div>
  </header>
  `;
}
