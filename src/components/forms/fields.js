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
    <div class="flex flex-col">
      <label for="${id}" class="font-thin text-[length:var(--font-size-small)]">${labelText}</label>
      <input
        class="
          font-[family-name:var(--secondary-font)]
          text-[length:var(--font-size-small)]
          p-[0.7rem]
          border
          border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]
          rounded-[var(--border-radius)]
          dark:border-[var(--surface-color)]"
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
    <div class="flex flex-col">
      <label for="${id}" class="font-thin text-[length:var(--font-size-small)]">${labelText}</label>
      <textarea
        class="
            font-[family-name:var(--secondary-font)]
            text-[length:var(--font-size-small)]
            p-[0.7rem]
            border
            border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]
            rounded-[var(--border-radius)]
            dark:border-[var(--surface-color)]"
          id="${id}"
          name="${name}"
          placeholder="${placeholder}"
        ${isRequired ? "required" : ""}
      >${value}</textarea>
    </div>
  `;
}
