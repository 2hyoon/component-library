import { initComponents } from "./../utils/initComponents";
import Header from "./../components/header";
import Accordion from "./../components/accordion";
import Sticky from "./../components/sticky";
// import Flip from "./../components/flip";
import Flip2 from "./../components/flip2";

const APP = {};

APP.helpers = {
  initComponents: (elem) => initComponents(elem, APP),
};

/**
 * Page components
 * <elem data-component="<component name>">
 */
APP.components = {
  Header: (elem) => new Header(elem, APP).init(),
  Accordion: (elem) => new Accordion(elem, APP).init(),
  Sticky: (elem) => new Sticky(elem, APP).init(),
  Flip2: (elem) => new Flip2(elem, APP).init(),
};

export default APP;
