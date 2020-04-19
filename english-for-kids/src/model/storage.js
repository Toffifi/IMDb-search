export default class Storage {
  constructor() {
    this.game = false;
  }

  async addCollbacks(categoriesCallback, toggleChanged) {
    this.categoriesCallback = categoriesCallback;
    this.toggleChanged = toggleChanged;
  }

  setCategories(categories) {
    if (categories !== this.categories) {
      this.categories = categories;
      this.categoriesCallback();
    }
  }

  setCards(cardsArray) {
    if (cardsArray !== this.cardsArray) {
      this.cardsArray = cardsArray;
    }
  }
  
  setGame(game) {
    if (game !== this.game) {
      this.game = game;
      this.toggleChanged();
    }
  }

  getCardsArray(name) {
    return this.cardsArray.find((e) => e.name === name).cardsArray;
  }
}