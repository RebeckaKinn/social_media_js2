import defaultProfileImage from "../assets/default_person.jpg";

export function getProfileAvatar(url, alt) {
  const imageUrl = url || defaultProfileImage;
  const imageAlt = alt || "";

  return /*HTML*/ `
    <div class="h-full max-h-12 min-h-12 aspect-square profile-icon">
      <img class="rounded-full shadow-[0_4px_8px_var(--shadow-color)]" src="${imageUrl}" alt="${imageAlt}" loading="lazy">
    </div>
  `;
}
