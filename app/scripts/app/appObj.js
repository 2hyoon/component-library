import { initComponents } from "./../utils/initComponents";
import Header from "./../components/header";
import Accordion from "./../components/accordion";
import Sticky from "./../components/sticky";
import LineChart from "../components/LineChart";

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
  LineChart: (elem) => new LineChart(elem, APP).init(),
};

export default APP;
