import Model from '../model/index';
import * as view from '../view';

export default class Controller {
  constructor() {
    this.search = 'Star Wars';
    this.translated = false;
    this.model = new Model();
  }

  async init() {
    view.initView(this.doTheSearch.bind(this));
    try {
      await this.createCards();
    } catch (error) {
      console.log(error.message);
    }
  }

  async doTheSearch() {
    try {
      await this.checkLanguage();
      await this.createCards();
    } catch (error) {
      console.log(error.message);
    }
  }

  async createCards() {
    const data = await this.model.loadData(this.search, 1, 'movie', '');
    console.log(data);
  }

  async checkLanguage() {
    const text = view.getSearchValue();
    if (text.match(/[а-яА-Я]/g)) {
      this.search = await this.model.getTranslation(text);
      this.translated = true;
    } else {
      this.search = text;
      this.translated = false;
    }
  }
}
