import { headerLinks, togglePlay } from '../view/header';
import { setActiveCategory } from './helpers';
export default class HeaderController {
  constructor(storage) {
      this.storage = storage;
      this.linkClick = this.linkClick.bind(this);
      togglePlay(this.toogleClick.bind(this));
  }

  categoriesChanged() {
    headerLinks(this.storage.categories, this.linkClick);
  }

  linkClick(name) {
    const data = setActiveCategory(this.storage.categories, name);
    this.storage.setCategories(data);
  }
  
  toogleClick(game) {
    this.storage.setGame(game)
  }
  
}