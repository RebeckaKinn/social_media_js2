export function ImagePreview({ url = "", alt = "" }) {
  return /*HTML*/ `
    <img id="image-url-preview" src="${url}" alt="${alt}" loading="lazy">
  `;
}
