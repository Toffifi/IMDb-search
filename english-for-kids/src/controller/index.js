import { clearCards } from '../view/helpers'

import HeaderController from './header';
import HomeController from './mainHome';
import CardsController from './mainCards';
export default class Controller {
  constructor(storage) {
      this.storage = storage;
  }

  initialize() {
    this.headerController = new HeaderController(this.storage);
    this.homeController = new HomeController(this.storage);
    this.cardsController = new CardsController(this.storage);
    this.storage.getData(this.categoriesChanged.bind(this), this.cardsChanged.bind(this),this.toggleChanged.bind(this));
  }

  categoriesChanged() {    
    clearCards();
    this.headerController.categoriesChanged();
    const page = this.storage.categories.find(e => e.active).name;
    switch (page) {
        case 'Home':
            this.homeController.drow();
            break;
    
        default:
          this.cardsController.drow(page);
            break;
    }
  }

  cardsChanged() {
    console.log("cards changed!")
  }

  toggleChanged() {
    this.cardsController.gameMode();
  }
}