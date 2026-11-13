export default function LoadingPost() {
  return /*HTML*/ `
    <section class="bg-(--surface-color) w-full max-w-160 min-h-40 p-4 rounded-(--border-radius) shadow-[0_4px_8px_var(--shadow-color)] post-card loading-card flex column gap-4">
      <div class="shimmer"></div>
      <div class="shimmer"></div>
      <div class="shimmer"></div>
    </section>
  `;
}
