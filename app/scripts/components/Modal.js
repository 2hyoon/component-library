import { addModalKeyDownHandler } from "../utils/a11y";

export default class Modal {
  constructor(elem, APP) {
    this.elem = elem;
    this.modal = this.elem.querySelector(".js-modal");
    this.dialog = this.elem.querySelector(".js-modal-dialog");
    this.openBtn = this.elem.querySelector(".js-btn-open");
    this.closeBtn = this.elem.querySelector(".js-btn-close");
    this.cancelBtn = this.elem.querySelector(".js-btn-cancel");
    this.okBtn = this.elem.querySelector(".js-btn-ok");
    this.firstFocusableElement = this.closeBtn;
    this.lastFocusableElement = this.okBtn;
  }

  openModal() {
    this.modal.classList.add("is-visible");
    this.closeBtn.focus();
  }

  closeModal() {
    this.modal.classList.remove("is-visible");
    this.openBtn.focus();
  }

  init() {
    addModalKeyDownHandler(
      this.dialog,
      this.firstFocusableElement,
      this.lastFocusableElement
    );

    this.openBtn.addEventListener("click", () => {
      this.openModal();
    });

    this.closeBtn.addEventListener("click", () => {
      this.closeModal();
    });

    this.cancelBtn.addEventListener("click", () => {
      this.closeModal();
    });

    this.okBtn.addEventListener("click", () => {
      this.closeModal();
    });

    this.modal.addEventListener("click", (e) => {
      if(!this.dialog.contains(e.target)) {
        this.closeModal();
      }
    })
  }
}
