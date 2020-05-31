import '../node_modules/normalize.css/normalize.css';
import './style.scss';

import App from './components/app';

function init() {
  const app = new App();
  app.initialize();
}

init();
