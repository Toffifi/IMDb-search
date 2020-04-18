import { clearCards } from '../view/helpers'

import HeaderController from './header';
import HomeController from './mainHome';
export default class Controller {
  constructor(storage) {
      this.storage = storage;
  }

  initialize() {
    this.headerController = new HeaderController(this.storage);
    this.homeController = new HomeController(this.storage);
    this.storage.getData(this.categoriesChanged.bind(this), this.cardsChanged.bind(this));
  }

  categoriesChanged() {
    this.headerController.categoriesChanged();
    switch (this.storage.categories.find(e => e.active).name) {
        case 'Home':
            this.homeController.drow();
            break;
    
        default:
            clearCards();
            break;
    }
  }                                                                        

  cardsChanged() {
    console.log("cards changed!")
  }
}