import HeaderController from './header'
export default class Controller {
  constructor(storage) {
      this.storage = storage;
  }

  initialize() {
    this.headerController = new HeaderController(this.storage);
    this.storage.getData(this.categoriesChanged.bind(this), this.cardsChanged.bind(this));
  }

  categoriesChanged() {
    this.headerController.categoriesChanged();
  }

  cardsChanged() {
    console.log("cards changed!")
  }
}