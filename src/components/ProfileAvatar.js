import defaultProfileImage from "../assets/default_person.jpg";

export function getProfileAvatar(url, alt) {
  const imageUrl = url || defaultProfileImage;
  const imageAlt = alt || "";

  return /*HTML*/ `
    <div class="profile-icon">
      <img src="${imageUrl}" alt="${imageAlt}" loading="lazy">
    </div>
  `;
}
