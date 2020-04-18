import { setActiveCategory } from './helpers';
import { categoryCards } from '../view/mainHome';

export default class HomeController {
  constructor(storage) {
      this.storage = storage;
      this.linkClick = this.linkClick.bind(this)
  }

  drow() {
    categoryCards(this.storage.categories.filter(e => e.image), this.linkClick);
  }
  
  linkClick(name) {
    const data = setActiveCategory(this.storage.categories, name);
    this.storage.setCategories(data);
  }
  
}