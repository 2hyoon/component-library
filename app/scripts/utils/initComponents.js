export function initComponents(elem, APP) {
  let init = (elem) => {
    let components = elem.getAttribute("data-js-component");

    if (!components) {
      return;
    } else {
      components = components.split(" ");
    }

    for (let i = 0, len = components.length; i < len; i++) {
      let componentName = components[i];
      if (APP.components[componentName]) {
        let component = new APP.components[componentName](elem, APP);
        if (component.init) {
          component.init();
        }
      }
    }
  };

  let childComponents = [...elem.querySelectorAll("[data-js-component]")];

  if (childComponents) {
    for (let i = 0; i < childComponents.length; i++) {
      init(childComponents[i]);
    }
  }

  init(elem);
}
