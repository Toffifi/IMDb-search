import { clearCards } from '../view/helpers'
import loadData from './service';

import HeaderController from './header';
import HomeController from './mainHome';
import CardsController from './mainCards';
export default class Controller {
  constructor(storage) {
      this.storage = storage;
  }

  async initialize() {
    this.headerController = new HeaderController(this.storage);
    this.homeController = new HomeController(this.storage);
    this.cardsController = new CardsController(this.storage);
    this.storage.addCollbacks(this.categoriesChanged.bind(this), this.cardsChanged.bind(this),this.toggleChanged.bind(this));
    const { categories, cards } = await loadData();
    this.storage.setCategories(categories);
    this.storage.setCards(cards);
  }

  categoriesChanged() {    
    clearCards();
    this.cardsController.resetGame();
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