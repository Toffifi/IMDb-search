import Model from '../model/index';
import * as view from '../view';
import Slider from '../view/slider';

export default class Controller {
  constructor() {
    this.search = 'Star Wars';
    this.translated = false;
    this.model = new Model();
    this.slider = new Slider(this.loadNextPage.bind(this));
    this.lastPage = 0;
    this.totalPages = 0;
  }

  async init() {
    view.initView(this.doTheSearch.bind(this));
    try {
      await this.createCards(0);
    } catch (error) {
      console.log(error.message);
    }
  }

  async doTheSearch() {
    try {
      await this.checkLanguage();
      await this.createCards(0);
    } catch (error) {
      console.log(error.message);
    }
  }

  async createCards(page) {
    const { data, total } = await this.model.loadData(this.search, page + 1, 'movie', '');
    if (page === 0) {
      this.slider.clearSlides();
      this.totalPages = Math.floor(total / 10);
    }
    data.forEach((el) => {
      const card = view.createCrad(el);
      this.slider.appendSlide(card);
    });
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

  loadNextPage(curentPage) {
    if (curentPage + 1 <= this.totalPages && this.lastPage < curentPage + 1) {
      this.lastPage = curentPage + 1;
      this.createCards(this.lastPage);
    }
  }
}
