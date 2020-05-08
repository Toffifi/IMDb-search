import '../node_modules/normalize.css/normalize.css';
import './style.scss';
import initKeyboard from './virtual-keyboard/index';

const keyboardButton = document.querySelector('#open-keyboard');

keyboardButton.addEventListener('click', () => {
  const keyboardContainer = document.querySelector('.keyboard-container');
  keyboardContainer.classList.toggle('active-keyboard');
});

const input = document.querySelector('#search-input');
const section = document.querySelector('#keyboard');
initKeyboard(input, section);
