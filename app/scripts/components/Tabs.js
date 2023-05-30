var tablist, tabs, tabpanels;

window.addEventListener('DOMContentLoaded', function(e) {
  tablist = document.querySelector('.tablist');
  tabs = document.querySelectorAll('.tab:not([disabled="true"])');
  tabpanels = document.querySelectorAll('.tabpanel');

  // Select previous/next tabs using Left and Right arrow keys
  tablist.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowLeft':
        selectPreviousTab();
        break;

      case 'ArrowRight':
        selectNextTab();
        break;

      case 'Home':  // optional
        e.preventDefault();  // prevent page scroll
        selectFirstTab();
        break;

      case 'End':  // optional
        e.preventDefault();  // prevent page scroll
        selectLastTab();
        break;
    }
  });

  // Activate tabs when they are clicked (also handles Enter and Space keys)
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      nextTabIndex = Array.prototype.slice.call(tabs).indexOf(e.target);
      selectTab(nextTabIndex);
    });
  });
});


/**
  Tab selection
*/
function selectPreviousTab() {
  var activeTab = document.querySelector('.tab[aria-selected="true"]');
  var activeTabIndex = Array.prototype.slice.call(tabs).indexOf(activeTab);

  // Select the previous tab, wrapping to last tab if needed
  if(activeTabIndex > 0) {
    selectTab(activeTabIndex - 1);
  } else {
    selectTab(tabs.length - 1);
  }
}

function selectNextTab() {
  var activeTab = document.querySelector('.tab[aria-selected="true"]');
  var activeTabIndex = Array.prototype.slice.call(tabs).indexOf(activeTab);

  // Select the next tab, wrapping to the first tab if needed
  if(activeTabIndex < tabs.length - 1) {
    selectTab(activeTabIndex + 1);
  } else {
    selectTab(0);
  }
}

function selectFirstTab() {
  selectTab(0);
}

function selectLastTab() {
  selectTab(tabs.length - 1);
}

function selectTab(index) {
  // Deactivate all tabs
  tabs.forEach(function(tab) {
    tab.setAttribute('aria-selected', false);
    tab.setAttribute('tabindex', -1);
  });

  // Activate only the requested tab, and set focus to it
  tabs[index].setAttribute('aria-selected', true);
  tabs[index].setAttribute('tabindex', 0);
  tabs[index].focus();

  // Hide all tabpanels
  tabpanels.forEach(function(tabpanel) {
    tabpanel.classList.remove('is-visible');
  });

  // Show only the tabpanel for the requested tab
  var nextTabpanel = document.querySelector('#' + tabs[index].getAttribute('aria-controls'));
  nextTabpanel.classList.add('is-visible');
}
