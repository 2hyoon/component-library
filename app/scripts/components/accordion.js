export default class Accordion {
  constructor(elem, APP) {
    this.elem = elem;
    this.triggers = this.elem.querySelectorAll(".js-trigger");
    this.panels = this.elem.querySelectorAll(".js-panel");
    this.allowMultiple = false;
  }

  togglePanel(index, waypoint) {
    const trigger = this.triggers[index];
    const panel = this.panels[index];
    const panelHeight = `${panel.querySelector(".js-content").offsetHeight}px`;

    trigger.classList.toggle("expanded");
    panel.classList.toggle("expanded");

    if (panel.classList.contains("expanded")) {
      panel.classList.remove("animate-out");
      panel.classList.add("animate-in");
      panel.style.height = panelHeight;
      trigger.setAttribute("aria-expanded", true);
      panel.setAttribute("aria-hidden", false);
    } else {
      panel.classList.remove("animate-in");
      panel.classList.add("animate-out");
      panel.style.height = 0;
      trigger.setAttribute("aria-expanded", false);
      panel.setAttribute("aria-hidden", true);
    }
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
      this.resizeAccordion();
    });
  }
}
