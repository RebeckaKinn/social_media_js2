export function PostTags(tags = []) {
  return /*html*/ `
    <section>
      <ul class="post-tags flex gap-1">
        ${tags
          .map((tag) => /*html*/ `<li class="small-txt italic">#${tag}</li>`)
          .join("")}
      </ul>
    </section>
  `;
}
