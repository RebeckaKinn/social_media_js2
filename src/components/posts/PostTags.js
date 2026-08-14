export function PostTags(tags = []) {
  return /*HTML*/ `
    <section>
      <ul class="post-tags flex gap-1">
        ${tags
          .map((tag) => /*HTML*/ `<li class="small-txt italic">#${tag}</li>`)
          .join("")}
      </ul>
    </section>
  `;
}
