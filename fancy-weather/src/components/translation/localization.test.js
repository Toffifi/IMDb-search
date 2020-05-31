/* eslint-disable no-undef */
import I18n from './index';


beforeEach(() => {
  fetch.resetMocks();
});
const i18n = new I18n();

const data = {
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
};

test('i18n translation test', () => {
  i18n.data = data;
  expect(i18n.getTranslation('placeholder')).toBe('Enter city');
  expect(i18n.getTranslation('month.9')).toBe('October');
  expect(i18n.getTranslation('noResults|awesomeApi')).toBe('No matches were found for "awesomeApi"');
});


test('i18n data load test', () => {
  i18n.data = null;
  fetch.mockResponseOnce(JSON.stringify(data));
  return i18n.getLocalizationFiles('en').then(() => expect(JSON.stringify(i18n.data)).toBe(JSON.stringify(data)));
});

test('i18n element translation test', () => {
  i18n.data = data;
  document.body.innerHTML = '<span id="i18nSpan" data-i18n="placeholder"></span>';
  i18n.translate();
  expect(document.querySelector('#i18nSpan').innerHTML).toBe('Enter city');
  document.body.innerHTML = '';
});
