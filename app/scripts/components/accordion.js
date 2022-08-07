export default class Accordion {
  constructor(elem, APP) {
    this.elem = elem;
    this.triggers = this.elem.querySelectorAll(".js-accordion-trigger");
    this.panels = this.elem.querySelectorAll(".js-accordion-panel");
    this.waypoint = null;
  }

  togglePanel(index, waypoint) {
    const trigger = this.triggers[index];
    const panel = this.panels[index];
    const targetHeight = panel.querySelector("div").offsetHeight + "px";

    if (
      waypoint &&
      index === 0 &&
      this.panels[0].classList.contains("expanded")
    )
      return;

    panel.classList.toggle("expanded");
    trigger.classList.toggle("expanded");

    if (panel.classList.contains("expanded")) {
      panel.classList.remove("animate-out");
      panel.classList.add("animate-in");
    } else {
      panel.classList.remove("animate-in");
      panel.classList.add("animate-out");
    }

    panel.style.height = panel.classList.contains("expanded")
      ? targetHeight
      : "0";

    trigger.setAttribute(
      "aria-expanded",
      trigger.classList.contains("expanded") ? "true" : "false"
    );
    
    panel.setAttribute(
      "aria-hidden",
      trigger.classList.contains("expanded") ? "false" : "true"
    );
  }

  resizePanel() {
    this.panels.forEach((elem) => {
      const targetHeight = elem.querySelector("div").offsetHeight + "px";
      elem.style.height = elem.classList.contains("expanded")
        ? targetHeight
        : "0";
    });
  }

  init() {console.log('accordion');
    this.triggers.forEach((elem, index) => {
      elem.addEventListener("click", (e) => {
        this.togglePanel(index);
      });
    });

    // this.waypoint = new Waypoint({
    //   element: this.elem,
    //   offset: this.elem.getAttribute("data-offset"),
    //   handler: (direction) => {
    //     if (direction == "down") {
    //       this.togglePanel(0, true);

    //       // For some reason, this misbehaves without the timeout
    //       setTimeout(() => this.waypoint.destroy(), 0);
    //     }
    //   },
    // });

    window.addEventListener("resize", () => {
      this.resizePanel();
    });
  }
}
