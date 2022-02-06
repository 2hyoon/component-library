import APP from "./app/appObj";

/**
 * Get Document Ready
 */
document.addEventListener("DOMContentLoaded", (event) => {
  APP.helpers.initComponents(document.body, APP);
});
