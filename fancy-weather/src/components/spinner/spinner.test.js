/* eslint-disable no-undef */
import Spinner from './index';

document.body.innerHTML = `
  <div class="lds-ripple"><div></div><div></div></div>
  <div class="blur"></div>
`;
const spinnerEl = document.querySelector('.lds-ripple');
const blurEl = document.querySelector('.blur');
const spinner = new Spinner();
test('spinner show test', () => {
  spinner.show();
  expect(spinnerEl.style.display).toBe('inline');
  expect(blurEl.style.display).toBe('inline');
});


test('spinner hide test', () => {
  spinner.hide();
  expect(spinnerEl.style.display).toBe('none');
  expect(blurEl.style.display).toBe('none');
});

document.body.innerHTML = '';
