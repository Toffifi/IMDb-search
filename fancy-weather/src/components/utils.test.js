/* eslint-disable no-undef */
import { getLocalTime, urlBuilder } from './utils';


test('urlBuilder test', () => {
  const params = {
    q: 'wetwetwetwe',
    key: 'dfhgdhsdhf',
    pretty: 1,
    no_annotations: 1,
    language: 'ru',
  };
  const apiUrl = 'http:/awesomeurl.ah';
  expect(urlBuilder(apiUrl, params)).toBe('http:/awesomeurl.ah?q=wetwetwetwe&key=dfhgdhsdhf&pretty=1&no_annotations=1&language=ru');
});


test('getLocalTime test', () => {
  const offset = 1 * 60 * 60;
  const now = Date.now();
  const diff = (new Date(now).getTimezoneOffset() / 60) + offset / 3600;
  const curHours = new Date(now).getHours();
  let res = (diff + curHours) % 24;
  res = res < 0 ? (24 + res) : res;
  expect(getLocalTime(offset, now).getHours()).toBe(res);
});
