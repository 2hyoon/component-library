export function flickityReadyHandler(carousel, dots) {
  if (carousel) carousel.setAttribute("aria-label", "Track of slides.");
  if (dots && dots.length > 0) dots[0].setAttribute("aria-current", true); // TODO first slide doesn't update attr
}

export function flickityChangeHandler(dots, index) {
  dots.forEach((dot, i) => {
    if (i === index) dot.setAttribute("aria-current", true);
    else dot.removeAttribute("aria-current");
  });
}

export function flickitySettleHandler(slides) {
  slides.forEach((slide) => {
    const focusableElements = slide.querySelectorAll("a, button");

    if (slide.classList.contains("is-selected")) {
      focusableElements.forEach((elem) => {
        elem.setAttribute("tabindex", -1);
      });
    } else {
      focusableElements.forEach((elem) => {
        elem.removeAttribute("tabindex");
      });
    }
  });
}
