export function PostTags(tags = []) {
  return /*HTML*/ `
    <section>
      <ul class="flex gap-4">
        ${tags
          .map(
            (tag) =>
              /*HTML*/ `<li class="w-fit bg-(--shadow-color) px-2 rounded-(--border-radius) text-(length:--font-size-small) italic">#${tag}</li>`,
          )
          .join("")}
      </ul>
    </section>
  `;
}
