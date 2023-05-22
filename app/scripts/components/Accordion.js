export default class Accordion {
  constructor(elem, APP) {
    this.elem = elem;
    this.tabs = this.elem.querySelectorAll(".js-tab");
    this.panels = this.elem.querySelectorAll(".js-panel");
    this.allowMultiple = false;
  }

  togglePanel(index) {
    const tab = this.tabs[index];
    const panel = this.panels[index];
    const panelHeight = `${panel.querySelector(".js-content").offsetHeight}px`;

    tab.classList.toggle("expanded");
    panel.classList.toggle("expanded");

    if (panel.classList.contains("expanded")) {
      panel.classList.remove("animate-out");
      panel.classList.add("animate-in");
      panel.style.height = panelHeight;
      panel.setAttribute("aria-hidden", false);
      tab.setAttribute("aria-expanded", true);
    } else {
      panel.classList.remove("animate-in");
      panel.classList.add("animate-out");
      panel.style.height = 0;
      panel.setAttribute("aria-hidden", true);
      tab.setAttribute("aria-expanded", false);
    }
  }

  setTabHandler() {
    this.tabs.forEach((t, i) => {
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
    this.setTabHandler();

    window.addEventListener("resize", () => {
      this.resizePanel();
    });
  }
}
