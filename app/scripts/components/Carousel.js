import Flickity from "flickity";
import {
  flickityReadyHandler,
  flickityChangeHandler,
  flickitySettleHandler,
} from "../utils/flickity";

export default class Carousel {
  constructor(elem, APP) {
    this.elem = elem;
    this.carousel = this.elem.querySelector(".js-carousel-slides");
    this.dots;
  }

  setupCarousel() {
    this.flkty = new Flickity(this.carousel, {
      accessibility: false,
      prevNextButtons: true,
      pageDots: false,
      autoPlay: false,
      imagesLoaded: true,
      cellAlign: "left",
      // contain: true,
      on: {
        ready: () => {
          this.dots = this.elem.querySelectorAll(".flickity-page-dots button");
          flickityReadyHandler(this.carousel, this.dots);
        },
        change: (index) => {
          flickityChangeHandler(this.dots, index);
        },
        settle: () => {
          flickitySettleHandler(
            this.carousel.querySelectorAll(".js-carousel-slide")
          );
        },
      },
    });
  }

  init() {
    this.setupCarousel();
  }
}
