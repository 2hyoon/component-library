export default class Accordion {
  constructor(elem, APP) {
    this.elem = elem;
    this.buttons = elem.querySelectorAll(".js-va-control");
    this.contents = elem.querySelectorAll(".js-va-content");
    this.waypoint = null;
  }

  closeContent(index) {
    this.buttons[index].classList.remove("active");
    this.contents[index].classList.remove("active");
    this.contents[index].style.height = "0";
    this.contents[index].classList.remove('animate-in');
    this.contents[index].classList.add('animate-out');
  }

  openContent(index) {
    this.buttons[index].classList.add("active");
    this.contents[index].classList.add("active");
    this.contents[index].style.height = this.contents[index].querySelector("div").offsetHeight + "px";
    this.contents[index].classList.remove('animate-out');
    this.contents[index].classList.add('animate-in');
  }

  toggleContents(index, isWaypoint = false) {
    this.contents.forEach((content, i) => {
      if (i == index) {
        if(content.classList.contains('active')) {
          if(!isWaypoint) this.closeContent(i);
        } else {
          this.openContent(i);
        }
      } else {
        this.closeContent(i);
      }
    });
  }

  setButtonHandler() {
    this.buttons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleContents(index);
      });
    });
  }

  setWaypoints() {
    this.waypoint = new Waypoint({
      element: this.elem,
      offset: 300,
      handler: (direction) => {
        if(direction=='down') this.toggleContents(0, true);
        setTimeout(() => this.waypoint.destroy(), 0);
      },
    });
  }

  resizeVA() {
    this.contents.forEach((elem) => {
      const targetHeight = elem.querySelector('div').offsetHeight + 'px';
      elem.style.height = elem.classList.contains('active') ? targetHeight : '0';
    });
  }

  init() {
    this.setButtonHandler();
    this.setWaypoints();
    window.addEventListener("resize", () => {
      this.resizeVA();
    });
  }
}
