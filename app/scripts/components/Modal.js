var trigger;
var backdrop;
var dialog;
var closeButton;
var otherButtons;
var firstFocusableElement, lastFocusableElement;
var isOpen = false;

document.addEventListener('DOMContentLoaded', function(e) {
  trigger = document.querySelector('.trigger');
  backdrop = document.querySelector('.backdrop');
  dialog = backdrop.querySelector('.modal-dialog');
  closeButton = dialog.querySelector('.close-button');
  otherButtons = dialog.querySelectorAll('.buttons button');
  firstFocusableElement = dialog.querySelector('.first-focusable-element');
  lastFocusableElement = dialog.querySelector('.last-focusable-element');

  // Open the dialog when the trigger button is activated.
  trigger.addEventListener('click', function(e) {
    openDialog();
  });

  // Close the dialog when the inner close button is activated.
  closeButton.addEventListener('click', function(e) {
    closeDialog();
  });

  // Close the dialog when the user clicks on the backdrop.
  backdrop.addEventListener('click', function(e) {
    if(!dialog.contains(e.target)) {
      closeDialog();
    }
  });

  // Close the dialog when 'Escape' key is pressed.
  backdrop.addEventListener('keydown', function(e) {
    if(e.key == 'Escape') {
      closeDialog();
    }
  });

  // Trap keyboard focus by moving focus to the first or last focusable element when the user tries to tab (or "backwards" tab) past them.
  dialog.addEventListener('keydown', function(e) {
    if(e.target == firstFocusableElement && e.key == 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if(e.target == lastFocusableElement && e.key == 'Tab' && !e.shiftKey) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  });

  // For code demo purposes only. Close the dialog when the Cancel or OK buttons are activated. In a real use case these might actually do something like set cookies or refresh the page or something.
  otherButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      closeDialog();
    });
  });
});

function openDialog() {
  backdrop.classList.add('is-visible');
  closeButton.focus();
}

function closeDialog() {
  backdrop.classList.remove('is-visible');
  trigger.focus();
}
