import '../node_modules/normalize.css/normalize.css';
import './style.scss';
import initKeyboard from './virtual-keyboard/index';
import Controller from './controller';

function init() {
  const controller = new Controller();

  const input = document.querySelector('#search-input');
  const section = document.querySelector('#keyboard');
  initKeyboard(input, section, controller.doTheSearch.bind(controller));

  controller.init();
}
init();
