import { headerLinks } from '../view/header';
export default class HeaderController {
  constructor(storage) {
      this.storage = storage;
  }

  categoriesChanged() {
    headerLinks(this.storage.categories, this.linkClick.bind(this));
  }
  
  linkClick(name) {
    const data =  this.storage.categories.map((e) => {
        if (e.name === name) {
            e.active = true;
        } else {
            e.active = false;
        }
        return e;
    })
    this.storage.setCategories(data);
  }
  
}