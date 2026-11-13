export function GeneralPlaceholder(content) {
  return /*HTML*/ `
    <div class="flex justify-center items-center border border-(--text-color) rounded-(--border-radius) bg-(--surface-color) p-8 text-center w-full max-w-160 min-h-20">
      <p class="text-(length:--font-size-small) italic">${content}</p>
    </div>
  `;
}
