import { cards, playAudio, toogleGame } from '../view/mainCards';

export default class CardsController {
  constructor(storage) {
      this.storage = storage;
      this.linkClick = this.linkClick.bind(this);
  }

  drow(page) {
    this.pageData = this.storage.cardsArray.find(e => e.name === page).cards;
    cards(this.pageData, this.linkClick);
    toogleGame(this.storage.game);
  }

  gameMode() {
    toogleGame(this.storage.game);
  }
  
  linkClick(id) {
    if(this.storage.game){      
      console.log(id);
    } else {
      playAudio(id);
    }
  }


  
}