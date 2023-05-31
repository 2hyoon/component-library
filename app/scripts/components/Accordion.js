export default class Accordion {
  constructor(elem, APP) {
    this.elem = elem;
    this.triggers = this.elem.querySelectorAll(".js-accordion-trigger");
    this.panels = this.elem.querySelectorAll(".js-accordion-panel");
  }

  togglePanel(index) {
    const trigger = this.triggers[index];
    const panel = this.panels[index];
    const panelHeight = `${panel.querySelector(".js-accordion-content").offsetHeight}px`;

    const targetState = panel.classList.toggle("expanded") ? true : false;

    panel.classList[targetState ? "remove" : "add"]("animate-out");
    panel.classList[targetState ? "add" : "remove"]("animate-in");
    panel.style.height = targetState ? panelHeight : 0;
    panel.setAttribute("aria-hidden", !targetState);
    trigger.setAttribute("aria-expanded", targetState);
  }

  setTriggerHandler() {
    this.triggers.forEach((t, i) => {
      t.addEventListener("click", () => {
        this.togglePanel(i);
      });
    });
  }

  resizePanel() {
    this.panels.forEach((elem) => {
      const targetHeight = elem.querySelector("div").offsetHeight + "px";
      elem.style.height = elem.classList.contains("expanded")
        ? targetHeight
        : "0";
    });
  }

  init() {
    this.setTriggerHandler();

    window.addEventListener("resize", () => {
      this.resizePanel();
    });
  }
}
