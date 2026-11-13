import { formatDate } from "../../utils/formatDate.js";

function isSameDate(created, updated) {
  return created === updated;
}

function TimestampItem(label, time) {
  return /*HTML*/ `
    <div>
      <span>${label}:</span>
      <span>${formatDate(time)}</span>
    </div>
  `;
}

export function PostTimestamp(created, updated = null) {
  let timeIsAlike = isSameDate(created, updated);

  if (updated === null) timeIsAlike = true;

  return /*HTML*/ `
    <section class="flex text-(length:--font-size-small) font-extralight text-(--color-primary) max-[500px]:flex-col ">
      ${TimestampItem("created", created)}
      ${
        !timeIsAlike
          ? /*HTML*/ `
            <span class="text-(--text-color) mx-2 max-[500px]:hidden">|</span>
            ${TimestampItem("updated", updated)}
          `
          : ""
      }
    </section>
  `;
}
