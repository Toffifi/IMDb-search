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
    this.year = '';
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
      this.showError(error.message);
      view.toogleSpinner(false);
    }
  }

  async doTheSearch() {
    const text = view.getSearchValue().trim();
    if (!text) {
      return;
    }
    view.setError('');
    if (this.showFavorite) {
      view.toggleActiveFavButton();
    }
    this.showFavorite = false;
    this.year = view.selectYear();
    try {
      await this.checkLanguage(text);
      await this.createCards(0);
    } catch (error) {
      this.showError(error.message);
      view.toogleSpinner(false);
    }
  }

  async createCards(page) {
    if (page === 0) {
      view.toogleSpinner(true);
    }
    const { data, total } = !this.showFavorite
      ? await this.model.loadData(this.search, page + 1, 'movie', this.year)
      : await this.model.loadFavFilms(page);
    if (page === 0) {
      this.slider.clearSlides();
      this.totalPages = Math.floor((total - 1) / 10);
      this.lastPage = 0;
    }
    data.forEach((el) => {
      const isFav = this.model.favFilms.includes(el.id);
      const card = view.createCrad(el, this.setFavFilm, isFav);
      this.slider.appendSlide(card);
    });
    view.toogleSpinner(false);
  }

  async checkLanguage(text) {
    if (text.match(/[а-яА-Я]/g)) {
      this.search = await this.model.getTranslation(text);
      this.translated = true;
      if (this.year.length > 0) {
        view.setInfo(`Showing results for <i>"${this.search}"</i> ${this.year} year`);
      } else {
        view.setInfo(`Showing results for <i>"${this.search}"</i>`);
      }
    } else {
      this.search = text;
      this.translated = false;
      view.setInfo('');
    }
  }

  loadNextPage(curentPage) {
    if (curentPage + 1 <= this.totalPages && this.lastPage < curentPage + 1) {
      this.lastPage = curentPage + 1;
      try {
        this.createCards(this.lastPage);
      } catch (error) {
        this.showError(error.message);
      }
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
      this.showError(error.message);
      view.toogleSpinner(false);
    }
  }

  showError(message) {
    view.setInfo('');
    switch (message) {
      case 'Too many results.':
        view.setInfo(`Too many results for <i>"${this.search}"</i>
          ${this.year ? ` year ${this.year}` : ''}. 
          Specify your request.`);
        break;
      case 'Movie not found!':
        view.setInfo(`No results for <i>"${this.search}"</i>
          ${this.year ? ` year ${this.year}` : ''}.`);
        break;
      case 'yandex_unauthorized':
        view.setError('Yandex translate api key error. Contact developer for the new api key');
        break;
      case 'yandex_error':
        view.setError('Yandex translate api error. Contact developer or try again later.');
        break;
      case 'imdb_unauthorized':
        view.setError('IMDB api key error. Contact developer for the new api key');
        break;
      case 'imdb_error':
        view.setError('IMDB api error. Contact developer or try again later.');
        break;
      default:
        view.setError(`Unknown error: ${message}`);
        break;
    }
  }
}
