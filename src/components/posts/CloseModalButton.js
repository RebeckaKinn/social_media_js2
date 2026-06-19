import closeIcon from "../../assets/icons/close.svg";

export function CloseModalButton() {
  return /*html*/ `
    <button class="close-modal-btn" aria-label="Close post" type="button">
      <img src="${closeIcon}" alt="">
    </button>
  `;
}
