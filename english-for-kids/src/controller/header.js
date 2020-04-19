import * as view from '../view/header';
import { setActiveCategory } from './helpers';
export default class HeaderController {
  constructor(storage) {
      this.storage = storage;
      this.linkClick = this.linkClick.bind(this);
      this.burgerState = true;
      view.togglePlay(this.toogleClick.bind(this));
      view.createBurger(this.burgerClick.bind(this));
  }

  categoriesChanged() {
    view.headerLinks(this.storage.categories, this.linkClick);
  }

  burgerClick() {
    this.burgerState = !this.burgerState;
    view.burgerStateChanged(this.burgerState);
  }

  linkClick(name) {
    const data = setActiveCategory(this.storage.categories, name);
    this.storage.setCategories(data);
    this.burgerState = !this.burgerState;
    view.burgerStateChanged(this.burgerState);
  }
  
  toogleClick(game) {
    this.storage.setGame(game)
  }
  
}