import { initComponents } from "./../utils/initComponents";
import Header from "./../components/header";
import Accordion from "./../components/accordion";

const APP = {};

APP.helpers = {
  initComponents: (elem) => initComponents(elem, APP),
};

/**
 * Page components
 * <elem data-js-component="<component name>">
 */
APP.components = {
  Header: (elem) => new Header(elem, APP).init(),
  Accordion: (elem) => new Accordion(elem, APP).init(),
};

export default APP;
