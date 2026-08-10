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
    <section class="post-timestamp flex">
        ${TimestampItem("created", created)}
        ${
          !timeIsAlike
            ? /*HTML*/ `
              <span class="separator">|</span>
                ${TimestampItem("updated", updated)}
                `
            : ""
        }
        </section>
    `;
}
