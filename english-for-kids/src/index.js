import 'bootswatch/dist/lumen/bootstrap.min.css';
import './style.scss'

import Cotroller from './controller/index';
import Storage from './model/storage'

const storage = new Storage();
const controller = new Cotroller(storage);
controller.initialize();
