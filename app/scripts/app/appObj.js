import { initComponents } from "./../utils/initComponents";
import Header from "./../components/Header";
import Accordion from "./../components/Accordion";
import Tab from "./../components/Tab";
import Modal from "./../components/Modal";
import Filter from "../components/Filter";
import Carousel from "./../components/Carousel";
import Charty from "./../components/Charty";
// import Sticky from "./../components/Sticky";

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
  Tab: (elem) => new Tab(elem, APP).init(),
  Modal: (elem) => new Modal(elem, APP).init(),
  Filter: (elem) => new Filter(elem, APP).init(),
  Carousel: (elem) => new Carousel(elem, APP).init(),
  Charty: (elem) => new Charty(elem, APP).init(),
  // Sticky: (elem) => new Sticky(elem, APP).init(),
};

export default APP;
