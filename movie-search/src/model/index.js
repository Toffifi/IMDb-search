export default class Model {
  constructor() {
    this.url = 'http://www.omdbapi.com/';
    this.apiKey = '834cd224';
  }

  async loadData(search, page, type, year) {
    const data = [];
    const promises = [];
    const searchResponse = await fetch(`${this.url}?apikey=${this.apiKey}&s=${search}&page=${page}&type=${type}&year=${year}`);
    const searchAswer = await searchResponse.json();
    const answer = searchAswer.Search;
    for (let i = 0; i < answer.length; i += 1) {
      data.push({
        title: answer[i].Title,
        year: answer[i].Year,
        image: answer[i].Poster,
      });
      promises.push(this.getRating(answer[i].imdbID));
    }

    await Promise.all(promises)
      .then((r) => data.forEach((e, i) => { e.imdbRating = r[i].imdbRating; }));

    return data;
  }

  getRating(id) {
    return fetch(`${this.url}?apikey=${this.apiKey}&i=${id}`)
      .then((result) => result.json());
  }
}
