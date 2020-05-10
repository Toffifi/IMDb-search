export default class Model {
  constructor() {
    this.url = 'http://www.omdbapi.com/';
    this.apiKey = '834cd224';
    this.yandexKey = 'trnsl.1.1.20200509T102006Z.38b830ac3f910bf1.c10d8359cc871ff373c03a4a8c0783e6f47e58b5';
    this.favFilms = [];
    this.getFavFilms();
  }

  getFavFilms() {
    const favFilmsJson = localStorage.getItem('favFilms');
    if (favFilmsJson) {
      try {
        this.favFilms = JSON.parse(favFilmsJson);
      } catch (error) {
        this.favFilms = [];
      }
    }
  }

  async loadFavFilms(page) {
    const promises = this.favFilms.slice(page * 10, (page + 1) * 10)
      .map((e) => this.getInfo(e));
    const data = await Promise.all(promises);
    return { data, total: this.favFilms.length };
  }

  async loadData(search, page, type, year) {
    let searchResponse;
    try {
      searchResponse = await fetch(`${this.url}?apikey=${this.apiKey}&s=${search}&page=${page}&type=${type}&y=${year}`);
    } catch (error) {
      throw new Error('No connection');
    }
    if (searchResponse.ok) {
      const searchAswer = await searchResponse.json();
      if (searchAswer.Response === 'True') {
        let data = null;
        const promises = searchAswer.Search.map((e) => this.getInfo(e.imdbID));
        data = await Promise.all(promises);
        return { data, total: searchAswer.totalResults };
      }
      throw new Error(searchAswer.Error);
    } else {
      throw new Error(searchResponse.status);
    }
  }

  async getInfo(id) {
    let imageOk = true;
    const answer = await fetch(`${this.url}?apikey=${this.apiKey}&i=${id}`);
    const result = await answer.json();
    if (result.Poster === 'N/A') {
      imageOk = false;
    } else {
      try {
        const imageCheck = await fetch(result.Poster);
        if (!imageCheck.ok) {
          imageOk = false;
        }
      } catch (error) {
        imageOk = false;
      }
    }
    return {
      id: result.imdbID,
      title: result.Title,
      year: result.Year,
      image: imageOk ? result.Poster : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhLinI3xZpIuFviNZcJ3X1qonvcA0rHcLhY57qgBAYwkNbQmgL&usqp=CAU',
      imdbRating: result.imdbRating,
    };
  }

  async getTranslation(str) {
    const translation = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.yandexKey}&text=${str}&lang=ru-en`)
      .then((result) => result.json())
      .then((result) => result.text[0]);
    return translation;
  }

  saveFavFilms() {
    localStorage.setItem('favFilms', JSON.stringify(this.favFilms));
  }
}
