import closeIcon from "../../assets/icons/close.svg";

export function CloseModalButton() {
  return /*html*/ `
    <button class="close-modal-btn" id="close-modal-btn" aria-label="Close overlay" type="button">
      <img src="${closeIcon}" alt="">
    </button>
  `;
}
