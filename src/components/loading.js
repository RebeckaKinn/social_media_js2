export default function LoadingPost(title = "loading", message = "") {
  return /*html*/ `
    <section class="flex center">
      <div class="flex column center gap-1">
        <h1>${title}</h1>
        <p>${message}</p>
      </div>
    </section>
  `;
}
