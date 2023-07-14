export default class Filter {
  constructor(elem, APP) {
    this.elem = elem;
    this.trigger = this.elem.querySelector(".js-filter-trigger");
    this.list = this.elem.querySelector(".js-filter-list");
    this.options = this.elem.querySelectorAll(".js-filter-options input");
    this.filteredResults = this.elem.querySelector(".js-filter-results");
    this.results;
  }

  updateResults() {
    this.filteredResults.innerHTML = "";

    this.options.forEach((option, index) => {
      if (!option.checked) return;

      const btn = document.createElement("button");
      btn.innerHTML = this.options[index].previousElementSibling.innerText;
      btn.classList.add("filter-remove-btn", "btn-delete");
      this.filteredResults.appendChild(btn);

      btn.addEventListener("click", () => {
        this.options[index].checked = false;
        this.updateResults();
      });
    });
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

    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        this.updateResults();
      });
    });
  }

  init() {
    this.setup();
  }
}
