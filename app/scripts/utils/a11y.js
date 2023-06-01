export function updateTabindex() {}

export function updateAriaExpanded() {}

export function addModalKeyDownHandler(
  target,
  firstFocusableElement,
  lastFocusableElement
) {
  target.addEventListener("keydown", function (e) {
    if (e.target == firstFocusableElement && e.key == "Tab" && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if (
      e.target == lastFocusableElement &&
      e.key == "Tab" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  });
}
