import * as view from '../view/mainCards';
import { setActiveCategory, getStatsRecord } from './helpers';

export default class CardsController {
  constructor(storage) {
      this.storage = storage;
      this.linkClick = this.linkClick.bind(this);
      this.startGame = this.startGame.bind(this);
      this.gameInProgress = false;
      this.gameData = null;
      this.currentWordId = null;
      this.wrongAnswers = 0;
  }

  draw(page) {
    this.pageData = this.storage.cardsArray.find(e => e.name === page).cards;
    view.cards(this.pageData, this.linkClick, this.startGame);
    view.toogleGame(this.storage.game);
  }

  gameMode() {
    if (!this.storage.game) {
      this.resetGame();
    }
    view.toogleGame(this.storage.game);
  }
  
  linkClick(id) {
    if(this.storage.game){      
      if(this.gameInProgress) {
        const card = this.gameData.find(e => e.id === id);
        if(id === this.currentWordId){
          card.answered = true;
          this.saveToLocalStorage(this.currentWordId, 'r');
          view.proceedAnswer(true, id);
          this.chooseWord();
        } else if(!card.answered) {
          this.saveToLocalStorage(this.currentWordId, 'w');
          view.proceedAnswer(false);
          this.wrongAnswers++;
        }
      }
    } else {
      view.playAudio(id);
      this.saveToLocalStorage(id, 't');
    }
  }

  startGame() {
    if(!this.gameInProgress){
      view.changeButton()
      this.gameInProgress = true;
      this.gameData = this.pageData.map((e) => ({
        id: e.id,
        answered: false
      }))
      this.chooseWord();
    } else {
      view.playAudio(this.currentWordId);
    }
  }

  resetGame() {
    this.gameInProgress = false;
    this.gameData = null;
    this.wrongAnswers = false;
    this.currentWordId = null;
    view.resetGame();
  }

  chooseWord() {
    const filtred = this.gameData.filter(e => !e.answered);
    if(filtred.length > 0){      
      const index = Math.floor(Math.random()*filtred.length);
      this.currentWordId = filtred[index].id;
      setTimeout(() => view.playAudio(this.currentWordId), 500)
    } else {
      setTimeout(() =>  view.gameOver(this.wrongAnswers) , 500);
      setTimeout(() => {
        const data = setActiveCategory(this.storage.categories, 'Home');
        this.storage.setCategories(data);
      }, 3000)
    }
  }
  
  saveToLocalStorage(id, type) {
    const record = getStatsRecord(id);
    if (type === 'r') {
      record.r++;
    } else if (type === 'w') {
      record.w++;
    } else {
      record.t++;
    }
    localStorage.setItem(id, JSON.stringify(record));
  }
}