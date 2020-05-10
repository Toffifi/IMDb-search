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

function favouriteBtn(callback) {
  const favButton = document.querySelector('#fav-button');
  favButton.addEventListener('click', () => {
    callback();
    favButton.classList.add('active');
  });
}

export function createCrad(obj, setFavFilm, isFav) {
  const div = document.createElement('div');
  div.className = 'swiper-slide';
  div.id = obj.id;
  div.innerHTML = `
  <div><a href = 'https://www.imdb.com/title/${obj.id}' target='_blank'>${obj.title}</a></div>
  <div class="image" style="background-image: url(${obj.image});"></div>
  <div><p><i class="fas fa-star"></i> ${obj.imdbRating}</p> <button><i class="fas fa-heart"></i></button></div>`;

  const heart = div.querySelector('button');
  if (isFav) {
    heart.style.color = 'red';
  }
  heart.addEventListener('click', () => {
    heart.style.color = setFavFilm(obj.id) ? 'red' : '';
  });

  return div;
}

export function setInfo(message) {
  const messageEl = document.querySelector('#p-message');
  messageEl.innerHTML = message;
}

export function setError(error) {
  const errorEl = document.querySelector('#p-error');
  errorEl.innerHTML = error;
}

export function toggleActiveFavButton() {
  const button = document.querySelector('header button');
  button.classList.toggle('active');
}

function createYears() {
  const select = document.querySelector('.dropdown-select');
  for (let i = 2020; i >= 1896; i -= 1) {
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  }
}

export function selectYear() {
  const year = document.querySelector('.dropdown-select').value;
  return year;
}

export function initView(searchCallback, favCallback) {
  bindEventHandler(searchCallback);
  openKeyboard();
  clearInput();
  favouriteBtn(favCallback);
  createYears();
}
