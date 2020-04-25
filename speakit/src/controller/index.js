import getData from "../model/index";
import View from "../view/index";

export default async function init() {
    const pageArr = refreshLevel();
    // const curGroup = 1;
    const data = await getData(pageArr[0], 5, false);
    const view = new View(data);
    view.init();
}

function refreshLevel() {
    const arr = []
    for (let i = 0; i < 30; i++){
        arr.push(i);
        shuffle(arr);        
    }
    return arr;
}
function shuffle(array) {
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