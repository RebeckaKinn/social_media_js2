export function NewPostButton() {
  return /*HTML*/ `
    <button
      id="open-new-post-button"
      type="button"
      class="
      self-center
      w-full
      max-w-[20rem]
      bg-(--surface-color)
      text-(--text-color)
      shadow-[0_4px_8px_var(--shadow-color)]"
    >
      Create new post
    </button>
  `;
}
