import './style.scss';
import Keyboard from './keyboard';
import KeyboardDriver from './keyboardDriver';

export default function initKeyboard(input, section, enterCallback) {
  const keyboardObj = new Keyboard(input, section, new KeyboardDriver(), enterCallback);
  keyboardObj.initialize();
}
