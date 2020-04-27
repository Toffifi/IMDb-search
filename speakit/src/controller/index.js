import getData from "../model/index";
import View from "../view/index";
export default class Controller{
    constructor() {
        this.data = [];
        this.newData = true;
        this.pageArr = [];
        this.page = 0;
        this.loadPage = 0;
        this.level = 0;        
        this.times = false;
        this.gaming = false;
        this.getLevel = this.getLevel.bind(this);
        this.getPage = this.getPage.bind(this);
        this.game = this.game.bind(this);
        this.getGuessed = this.getGuessed.bind(this);
        this.word = '';
        this.recor = true;
        this.guessed = [];
    }

    async init(first){
        if (first) {
            this.refreshLevel();
        }
        if(this.newData){
            const data = await getData(this.loadPage, this.level, this.times)
            this.data = data;
            const view = new View(data, this.getLevel, this.getPage, this.game, this.gaming);
            view.init(first);
            this.newData = false;
        } else{
            const view = new View(this.data, this.getLevel, this.getPage, this.game, this.gaming, this.word, this.getGuessed, this.guessed);
            view.init(first);
        }


    }

    refreshLevel() {
        this.page = 0;
        this.loadPage = Math.floor(Math.random() * 29);
        this.times = false;
        const arr = []
        for (let i = 0; i < 60; i++){
            arr.push(i);
            this.shuffle(arr);
        }
        this.pageArr = arr;
    }

    shuffle(array) { //not necessary
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
            this.newData = true;
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
        this.newData = true;
        this.init();
    }

    game(startGame){
        if(this.recor){
            this.startRecord();
            this.recor = false;
        }


        if(startGame != this.gaming){
            this.gaming = startGame;
            this.init();
        }
        if(!startGame) {
            this.word = '';
        }
    }

    startRecord(){
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.interimResults = true;
        recognition.lang = 'en-En';
        
        recognition.addEventListener('result', (e) => {    
            const transcript = Array.from(e.results)
            .map(e => e[0])
            .map(e => e.transcript)[0]
            
            if(e.results[0].isFinal){
                if(transcript != this.word && this.gaming){
                    this.word = transcript;
                    this.init();
                }
            }
        })
        
        recognition.addEventListener('end', () => {
            recognition.start();
        })

        recognition.start();
    }

    getGuessed(div){
        this.guessed.push(div);
        console.log(this.guessed, '1')
        this.init();
    }
}