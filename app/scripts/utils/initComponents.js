export function initComponents(elem, APP) {
  const jsComponents = [...elem.querySelectorAll("[data-js-component]")];

  // initialize components
  const initComponent = (elem) => {
    let componentList = elem.dataset.jsComponent;

    componentList = componentList ? componentList.split(" ") : null;

    componentList.forEach((componentName) => {
      if (APP.components[componentName]) {
        const targetComponent = new APP.components[componentName](elem, APP);
        if (targetComponent.init) {
          targetComponent.init();
        }
      }
    });
  };

  // get components
  if (jsComponents) {
    jsComponents.forEach((elem) => {
      initComponent(elem);
    });
  }

  // for body elem
  initComponent(elem);
}
