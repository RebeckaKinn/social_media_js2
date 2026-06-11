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
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
    <div>search</div>
  </header>
  `;
}
