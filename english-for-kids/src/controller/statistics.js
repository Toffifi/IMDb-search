import { getStatsRecord } from './helpers';
import * as view from '../view/statistics'
export default class StatiscticsController {
  constructor(storage) {
      this.storage = storage;
      this.statsArr = null;
      this.sortArray = this.sortArray.bind(this);
      this.clearStats = this.clearStats.bind(this);
      this.cols = [
        "category",
        "word",
        "translation",
        "training",
        "correct",
        "failure",
      ];
      this.sort = {
        field: "category",
        order: true,
      }
  }

  draw() {
    this.createStatsArr();
    view.drawTable(this.statsArr, this.cols, this.sortArray, this.clearStats);
  }

  createStatsArr() {
    this.statsArr = [];
    this.storage.cardsArray.forEach((e) => {
      this.statsArr.push(...e.cards.map((c) => {
        const record = getStatsRecord(c.id);
        return {
          id: c.id,
          category: e.name,
          word: c.word,
          translation: c.translation,
          training: record.t,
          correct: record.r,
          failure: record.w,
        }
      }))
    });
    this.sortFn();
  }

  sortArray(field) {
    if (this.sort.field !== field) {
      this.sort.order = true;
    } else {
      this.sort.order = !this.sort.order;
    }
    this.sort.field = field;
    this.sortFn();
    view.redraw(this.statsArr, this.cols);
  }

  sortFn() {
    this.statsArr = this.statsArr.sort((a, b) => {
      let res = 0;
      if (typeof a === "number" && typeof b === "number") {
        res = a[this.sort.field] - b[this.sort.field];
      } else {
        res = (a[this.sort.field] > b[this.sort.field]) ?  1 : -1;
      }
      return  this.sort.order ? res : res * -1
    });
  }

  clearStats() {
    localStorage.clear();
    this.createStatsArr()
    view.redraw(this.statsArr, this.cols);
  }
  // linkClick(name) {
  //   //const data = setActiveCategory(this.storage.categories, name);
  //   this.storage.setCategories(data);
  // }
  
}