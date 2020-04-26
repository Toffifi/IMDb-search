import getData from "../model/index";
import View from "../view/index";
export default class Controller{
    constructor() {
        this.pageArr = [];
        this.page = 0;
        this.loadPage = 0;
        this.level = 0;        
        this.times = false;
        this.getLevel = this.getLevel.bind(this);
        this.getPage = this.getPage.bind(this);
    }

    async init(first){
        if (first) {
            this.refreshLevel();
        }
        const data = await getData(this.loadPage, this.level, this.times);
        const view = new View(data, this.getLevel, this.getPage);
        view.init(first);
    }

    refreshLevel() {
        this.page = 0;
        this.loadPage = 0;
        this.times = false;
        const arr = []
        for (let i = 0; i < 60; i++){
            arr.push(i);
            this.shuffle(arr);
        }
        this.pageArr = arr;
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    getLevel(id) {
        if(id !== this.level){            
            this.level = id;
            this.refreshLevel();
            this.init();
        }
    }

    getPage(forward) {
        if (forward) {
            this.page = this.page < this.pageArr.length - 1 ? this.page + 1 : 0;
        } else {
            this.page = this.page > 0 ? this.page - 1 : this.pageArr.length - 1;
        }
        this.loadPage = Math.floor(this.pageArr[this.page] / 2);
        if (this.pageArr[this.page] % 2 !== 0) {
            this.times = true;
        } else {
            this.times = false;
        }
        this.init();
    }
}