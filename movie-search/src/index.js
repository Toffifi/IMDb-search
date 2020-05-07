import '../node_modules/normalize.css/normalize.css';
import './style.scss';
import initKeyboard from './virtual-keyboard/index';

const input = document.querySelector('#search-input');
const section = document.querySelector('#keyboard');
initKeyboard(input, section);
