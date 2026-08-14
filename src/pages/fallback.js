export default function Fallback({
  title = "Page not found",
  message = "The page you are looking for does not exist.",
} = {}) {
  return /*HTML*/ `
    <section class="fallback flex center">
      <div class="flex column center gap-1">
        <h1>${title}</h1>
        <p>${message}</p>
      </div>
    </section>
  `;
}
