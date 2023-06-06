export function addModalKeyDownHandler(
  target,
  firstFocusableElement,
  lastFocusableElement
) {
  if (!target || !firstFocusableElement || !lastFocusableElement) return;

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
