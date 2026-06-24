export function ProfileBio(text = "") {
  return /*HTML*/ `
  <div>
      <p>${text == "" ? "No bio provided" : text}</p>
    </div>
  `;
}
