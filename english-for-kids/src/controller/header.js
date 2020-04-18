import { headerLinks } from '../view/header';
import { setActiveCategory } from './helpers';
export default class HeaderController {
  constructor(storage) {
      this.storage = storage;
  }

  categoriesChanged() {
    headerLinks(this.storage.categories, this.linkClick.bind(this));
  }

  linkClick(name) {
    const data = setActiveCategory(this.storage.categories, name);
    this.storage.setCategories(data);
  }
  
}