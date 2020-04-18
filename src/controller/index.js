import { headerLinks } from '../view/header';
export default class Controller {
  constructor(storage) {
      this.storage = storage;
  }

  initialize() {
      this.storage.getData(this.categoriesChanged.bind(this), this.cardsChanged.bind(this));
  }

  categoriesChanged() {
    headerLinks(this.storage.categories, this.linkClick.bind(this));
  }

  cardsChanged() {
    console.log("cards changed!")
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