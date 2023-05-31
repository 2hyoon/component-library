export default class Tab {
  constructor(elem, APP) {
    this.elem = elem;
    this.tablist = this.elem.querySelector(".js-tablist");
    this.tabs = this.elem.querySelectorAll('.js-tab:not([disabled="true"])');
    this.panels = this.elem.querySelectorAll(".js-panel");
    this.currentTab = 0;
  }

  updateTabs() {
    this.tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", this.currentTab === i ? true : false);
      tab.setAttribute("tabindex", this.currentTab === i ? 0 : -1);
      if (this.currentTab === i) tab.focus();
    });

    this.panels.forEach((panel, i) => {
      panel.classList[this.currentTab === i ? "add" : "remove"]("is-visible");
    });
  }

  addKeyHandler() {
    this.tablist.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.currentTab--;
          if (this.currentTab < 0) this.currentTab = this.tabs.length - 1;
          break;

        case "ArrowRight":
          this.currentTab++;
          if (this.currentTab >= this.tabs.length) this.currentTab = 0;
          this.currentTab;
          break;

        // optional
        // case "Home":
        //   e.preventDefault();
        //   this.currentTab = 0;
        //   break;

        // case "End":
        //   e.preventDefault();
        //   this.currentTab = this.tabs.length;
        //   break;
      }

      this.updateTabs();
    });
  }

  tabClickHandler() {
    this.tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => {
        this.currentTab = i;
        this.updateTabs();
      });
    });
  }

  init() {
    this.addKeyHandler();
    this.tabClickHandler();
  }
}
