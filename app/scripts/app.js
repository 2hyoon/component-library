import APP from "./app/appObj";

/**
 * Get Document Ready
 */
document.addEventListener("DOMContentLoaded", (e) => {
  APP.helpers.initComponents(document.body, APP);
});
