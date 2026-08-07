export function getSearchQuery() {
  const queryString = window.location.hash.split("?")[1] || "";
  return new URLSearchParams(queryString).get("q")?.trim() || "";
}

export function setupPostSearch({ signal } = {}) {
  const form = document.querySelector("#post-search-form");
  const input = document.querySelector("#post-search-input");

  if (!form || !input) return;

  input.value = getSearchQuery();

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const query = input.value.trim();

      window.location.hash = query ? `#/?q=${encodeURIComponent(query)}` : "#/";
    },
    { signal },
  );
}
