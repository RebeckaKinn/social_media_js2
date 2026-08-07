export function FormInput({
  labelText,
  id,
  name,
  value = "",
  type = "text",
  autocomplete = "",
  placeholder = "",
  isRequired = false,
  maxlength = "",
}) {
  return /*HTML*/ `
    <div class="flex column">
        <label for="${id}">${labelText}</label>
        <input
            id="${id}"
            name="${name}"
            type="${type}"
            value="${value}"
            autocomplete="${autocomplete}"
            placeholder="${placeholder}"
            ${isRequired ? "required" : ""}
            ${maxlength ? `maxlength="${maxlength}"` : ""}
        >
    </div>
    `;
}

export function FormTextarea({
  labelText,
  id,
  name,
  value = "",
  placeholder = "",
  isRequired = false,
}) {
  return /*HTML*/ `
    <div class="flex column">
        <label for="${id}">${labelText}</label>
        <textarea
            id="${id}"
            name="${name}"
            value="${value}"
            placeholder="${placeholder}"
            ${isRequired ? "required" : ""}
        ></textarea>
    </div>
    `;
}
