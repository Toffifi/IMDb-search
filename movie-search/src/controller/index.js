import Model from '../model/index';
import * as view from '../view';

export default class Controller {
  constructor() {
    this.search = '';
    this.model = new Model();
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    view.bindEventHandler(this.doTheSearch.bind(this));
  }

  async doTheSearch() {
    this.search = view.getSearchValue();
    const data = await this.model.loadData(this.search, 1, 'movie', '');
    console.log(this.search);
    console.log(data);
  }
}
