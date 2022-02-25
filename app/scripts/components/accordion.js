export default class Accordion {
  constructor(elem, APP) {
    this.elem = elem;
    this.triggers = this.elem.querySelectorAll(".accordion-trigger");
    this.panels = this.elem.querySelectorAll(".accordion-panel");
    this.allowMultiple = false;
  }

  togglePanel(index) {
    const trigger = this.triggers[index];
    const panel = this.panels[index];
    const panelHeight = `${
      panel.querySelector(".accordion-content").offsetHeight
    }px`;

    panel.classList.add('expanded')
  }

  setTriggerHandler() {
    this.triggers.forEach((t, i) => {
      t.addEventListener("click", () => {
        this.togglePanel(i);
      });
    });
  }

  resizeAccordion() {
    this.panels.forEach((panel) => {
      const panelHeight = `${
        panel.querySelector(".accordion-content").offsetHeight
      }px`;

      panel.style.height = panel.classList.contains("expanded")
        ? panelHeight
        : "0";
    });
  }

  keyDownHandler(e) {

  }

  init() {
    this.setTriggerHandler();

    window.addEventListener("resize", () => {
      this.resizeAccordion();
    });

    this.elem.addEventListener("keydown", (e) => {
      this.keyDownHandler(e);
    })
  }
}
