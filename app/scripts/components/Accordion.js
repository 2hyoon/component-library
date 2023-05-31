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

    const targetExpandState = panel.classList.toggle("expanded") ? true : false;

    panel.classList[targetExpandState ? "remove" : "add"]("animate-out");
    panel.classList[targetExpandState ? "add" : "remove"]("animate-in");
    panel.style.height = targetExpandState ? panelHeight : 0;
    panel.setAttribute("aria-hidden", !targetExpandState);
    trigger.setAttribute("aria-expanded", targetExpandState);
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
