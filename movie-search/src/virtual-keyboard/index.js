import './style.scss';
import Keyboard from './keyboard';
import KeyboardDriver from './keyboardDriver';

export default function initKeyboard(input, section) {
  const keyboardObj = new Keyboard(input, section, new KeyboardDriver());
  keyboardObj.initialize();
}
