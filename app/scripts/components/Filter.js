export default class Filter {
  constructor(elem, APP) {
    this.elem = elem;
    this.trigger = this.elem.querySelector(".js-filter-trigger");
    this.list = this.elem.querySelector(".js-filter-list");
  }

  setup() {
    if (!this.trigger || !this.list) return;

    /* toggle expanded */
    this.trigger.addEventListener("click", () => {
      const isExpanded = this.trigger.getAttribute("aria-expanded");

      this.trigger.setAttribute(
        "aria-expanded",
        isExpanded === "true" ? false : true
      );
    });

    /* collapse the popup when Escape key is pressed. */
    this.trigger.addEventListener("keydown", (e) => {
      const isExpanded = this.trigger.getAttribute("aria-expanded");

      if (e.key === "Escape" && isExpanded === "true") {
        this.trigger.setAttribute("aria-expanded", false);
      }
    });

    /* collapse the popup when Escape key is pressed. */
    this.list.addEventListener("keydown", (e) => {
      var isExpanded =
        this.trigger.getAttribute("aria-expanded") === "true" ? true : false;

      if (e.key === "Escape" && isExpanded) {
        this.trigger.setAttribute("aria-expanded", false);
        this.trigger.focus();
      }
    });

    /** Collapse the popup if the user clicks anywhere outside it. */
    document.addEventListener("click", (e) => {
      var isExpanded =
        this.trigger.getAttribute("aria-expanded") === "true" ? true : false;

      if (
        !this.list.contains(e.target) &&
        !this.trigger.contains(e.target) &&
        this.trigger != e.target &&
        isExpanded
      ) {
        this.trigger.setAttribute("aria-expanded", false);
      }
    });
  }

  init() {
    this.setup();
  }
}
