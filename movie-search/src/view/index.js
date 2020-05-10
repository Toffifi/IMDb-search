function bindEventHandler(callback) {
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', callback);
}

export function getSearchValue() {
  const input = document.querySelector('#search-input');
  return input.value;
}

function openKeyboard() {
  const keyboardButton = document.querySelector('#open-keyboard');

  keyboardButton.addEventListener('click', () => {
    const keyboardContainer = document.querySelector('.keyboard-container');
    keyboardContainer.classList.toggle('active-keyboard');
    keyboardButton.classList.toggle('active');
  });
}

function clearInput() {
  const clearButton = document.querySelector('#clear-button');
  const input = document.querySelector('#search-input');

  clearButton.addEventListener('click', () => {
    input.value = '';
  });
}

export function createCrad(obj) {
  const div = document.createElement('div');
  div.className = 'swiper-slide';
  div.id = obj.id;
  div.innerHTML = `
  <a href = 'https://www.imdb.com/title/${obj.id}'>${obj.title}</a>
  <img src = ${obj.image === 'N/A' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhLinI3xZpIuFviNZcJ3X1qonvcA0rHcLhY57qgBAYwkNbQmgL&usqp=CAU' : obj.image}>
  <p><i class="fas fa-star"></i> ${obj.imdbRating}</p> <button><i class="fas fa-heart"></i></button>`;

  const heart = div.querySelector('button');

  heart.addEventListener('click', () => {
    heart.style.color = 'red';
  });

  return div;
}

export function initView(callback) {
  bindEventHandler(callback);
  openKeyboard();
  clearInput();
}
