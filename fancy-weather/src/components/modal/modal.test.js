/* eslint-disable no-undef */
import Modal from './index';
import I18n from '../translation';

const i18n = new I18n();
i18n.data = {
  placeholder: 'Enter city',
  search: 'search',
  feel: 'Feels like',
  wind: 'Wind',
  ms: 'm/s',
  month: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',
  ],
  noResults: 'No matches were found for "{0}"',
  error: 'WE ARE ALL GONNA DIE',
};

const modal = new Modal(i18n);

test('modal show test', () => {
  modal.draw('', '', 'noResults|SORRY', true);
  const modalInnerHTML = `
  <i class="fas fa-times"></i>
  <h2>WE ARE ALL GONNA DIE</h2>
  <p data-i18n="noResults|SORRY">No matches were found for "SORRY"</p>
  `.replace(/\s/g, '');
  expect(modal.modal.innerHTML.replace(/\s/g, '')).toBe(modalInnerHTML);
});

test('modal hide test', () => {
  modal.deleteModal();
  expect(document.body.innerHTML).toBe('');
});

document.body.innerHTML = '';
