import { getLocalTime } from '../utils';

function getStr(t) {
  return t < 10 ? `0${t}` : `${t}`;
}
export default class Clock {
  constructor(container, i18n) {
    this.container = container;
    this.i18n = i18n;
    this.offset = null;
    setInterval(this.tick.bind(this), 500);
  }


  tick() {
    const time = getLocalTime(this.offset);
    const hh = getStr(time.getHours());
    const mm = getStr(time.getMinutes());
    const ss = getStr(time.getSeconds());
    const day = time.getDay();
    const date = time.getDate();
    const month = time.getMonth();
    this.container.innerHTML = `
      <span data-i18n='day.${day}'>${this.i18n.getTranslation(`day.${day}`)}</span> ${date} <span data-i18n='month.${month}'>${this.i18n.getTranslation(`month.${month}`)}</span> ${hh}:${mm}:${ss}
    `;
  }
}
