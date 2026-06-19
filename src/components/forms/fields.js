export function FormInput({
  labelText,
  id,
  name,
  type = "text",
  autocomplete = "",
  placeholder = "",
  isRequired = false,
}) {
  return /*HTML*/ `
    <div class="flex column">
        <label for="${id}">${labelText}</label>
        <input
            id="${id}"
            name="${name}"
            type="${type}"
            autocomplete="${autocomplete}"
            placeholder="${placeholder}"
            ${isRequired ? "required" : ""}
        >
    </div>
    `;
}

export function FormTextarea({
  labelText,
  id,
  name,
  placeholder = "",
  isRequired = false,
}) {
  return /*HTML*/ `
    <div class="flex column">
        <label for="${id}">${labelText}</label>
        <textarea
            id="${id}"
            name="${name}"
            placeholder="${placeholder}"
            ${isRequired ? "required" : ""}
        ></textarea>
    </div>
    `;
}
