import loadData from './service'

export default class Storage {
  constructor() {

  }

  async getData(categoriesCallback, cardsCallback) {
    this.categoriesCallback = categoriesCallback;
    this.cardsCallback = cardsCallback;
    const { categories, cards } = await loadData();
    this.setCategories(categories);
    this.setCards(cards);
  }

  setCategories(categories) {
    this.categories = categories;
    this.categoriesCallback();
  }

  setCards(cardsArray) {
    this.cardsArray = cardsArray;
    this.cardsCallback();
  }

  getCardsArray(name) {
    return this.cardsArray.find((e) => e.name === name).cardsArray;
  }
}