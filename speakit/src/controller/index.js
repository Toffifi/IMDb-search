import getData from "../model/index";
import View from "../view/index";
export default class Controller{
    constructor() {
        this.pageArr = [];
        this.level = 0;
        this.getLevel = this.getLevel.bind(this);
    }

    async init(){
        this.refreshLevel()
        const data = await getData(this.pageArr[0], this.level, false);
        const view = new View(data, this.getLevel);
        view.init();        
    }

    refreshLevel() {
        const arr = []
        for (let i = 0; i < 30; i++){
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
            this.init();
        }
    }
}