import Model from '../model/index';
import * as view from '../view';
import Slider from '../view/slider';

export default class Controller {
  constructor() {
    this.showFavorite = false;
    this.search = 'Star Wars';
    this.translated = false;
    this.model = new Model();
    this.slider = new Slider(this.loadNextPage.bind(this));
    this.lastPage = 0;
    this.totalPages = 0;
    this.setFavFilm = this.setFavFilm.bind(this);
  }

  async init() {
    view.initView(this.doTheSearch.bind(this), this.setFavMode.bind(this));
    this.showFavorite = this.model.favFilms.length !== 0;
    if (this.showFavorite) {
      view.toggleActiveFavButton();
    }
    view.setInfo(this.showFavorite ? 'Your favourite films' : '');
    try {
      await this.createCards(0);
    } catch (error) {
      view.setError(error.message);
    }
  }

  async doTheSearch() {
    const text = view.getSearchValue();
    if (!text) {
      return;
    }
    view.setError('');
    this.showFavorite = false;
    view.toggleActiveFavButton();
    try {
      await this.checkLanguage(text);
      await this.createCards(0);
    } catch (error) {
      view.setError(error.message);
    }
  }

  async createCards(page) {
    const { data, total } = !this.showFavorite
      ? await this.model.loadData(this.search, page + 1, 'movie', '')
      : await this.model.loadFavFilms(page);
    if (page === 0) {
      this.slider.clearSlides();
      this.totalPages = Math.floor(total / 10);
      this.lastPage = 0;
    }
    data.forEach((el) => {
      const isFav = this.model.favFilms.includes(el.id);
      const card = view.createCrad(el, this.setFavFilm, isFav);
      this.slider.appendSlide(card);
    });
  }

  async checkLanguage(text) {
    if (text.match(/[а-яА-Я]/g)) {
      this.search = await this.model.getTranslation(text);
      this.translated = true;
      view.setInfo(`Showing results for <span>"${this.search}"</span>`);
    } else {
      this.search = text;
      this.translated = false;
      view.setInfo('');
    }
  }

  loadNextPage(curentPage) {
    if (curentPage + 1 <= this.totalPages && this.lastPage < curentPage + 1) {
      this.lastPage = curentPage + 1;
      this.createCards(this.lastPage);
    }
  }

  setFavFilm(id) {
    const add = !this.model.favFilms.includes(id);
    if (add) {
      this.model.favFilms.push(id);
    } else {
      this.model.favFilms = this.model.favFilms.filter((e) => e !== id);
    }
    this.model.saveFavFilms();
    return add;
  }

  async setFavMode() {
    view.setError('');
    this.showFavorite = true;
    this.translated = false;
    if (this.model.favFilms.length > 0) {
      view.setInfo('Your favourite films');
    } else {
      view.setInfo('You have no favorite films');
    }
    try {
      await this.createCards(0);
    } catch (error) {
      view.setError(error.message);
    }
  }
}
