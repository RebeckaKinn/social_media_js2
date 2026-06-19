let currentModal = null;

export function showModal(content) {
  if (currentModal) {
    currentModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = content;

  document.body.classList.add("modal-open");
  document.body.appendChild(modal);
  currentModal = modal;

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest(".close-modal-btn")) {
      closeModal();
    }
  });
}

export function closeModal() {
  if (currentModal) {
    currentModal.remove();
    currentModal = null;
    document.body.classList.remove("modal-open");
  }
}
