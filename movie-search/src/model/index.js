export default class Model {
  constructor() {
    this.url = 'http://www.omdbapi.com/';
    this.apiKey = '834cd224';
    this.yandexKey = 'trnsl.1.1.20200509T102006Z.38b830ac3f910bf1.c10d8359cc871ff373c03a4a8c0783e6f47e58b5';
  }

  async loadData(search, page, type, year) {
    const data = [];
    const promises = [];
    let searchResponse;
    try {
      searchResponse = await fetch(`${this.url}?apikey=${this.apiKey}&s=${search}&page=${page}&type=${type}&year=${year}`);
    } catch (error) {
      throw new Error('No connection');
    }
    if (searchResponse.ok) {
      const searchAswer = await searchResponse.json();
      if (searchAswer.Response === 'True') {
        const answer = searchAswer.Search;
        for (let i = 0; i < answer.length; i += 1) {
          data.push({
            id: answer[i].imdbID,
            title: answer[i].Title,
            year: answer[i].Year,
            image: answer[i].Poster,
          });
          promises.push(this.getRating(answer[i].imdbID));
        }

        await Promise.all(promises)
          .then((r) => data.forEach((e, i) => { e.imdbRating = r[i].imdbRating; }));

        return { data, total: searchAswer.totalResults };
      }
      throw new Error(searchAswer.Error);
    } else {
      throw new Error(searchResponse.status);
    }
  }

  getRating(id) {
    return fetch(`${this.url}?apikey=${this.apiKey}&i=${id}`)
      .then((result) => result.json());
  }

  async getTranslation(str) {
    const translation = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.yandexKey}&text=${str}&lang=ru-en`)
      .then((result) => result.json())
      .then((result) => result.text[0]);
    return translation;
  }
}
