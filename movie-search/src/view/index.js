export function bindEventHandler(callback) {
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

export function initView(callback) {
  bindEventHandler(callback);
  openKeyboard();
}
