import './style.css';

import { urlBuilder, getLocalTime } from '../utils';
import svg from './svgIcons';

export default class Weather {
  constructor(todayContainer, nextDaysContainer, i18n) {
    this.api = 'https://api.openweathermap.org/data/2.5/forecast';
    this.apiKey = 'bd3486a1576873e45af5d2bf30eb720b';
    this.todayContainer = todayContainer;
    this.nextDaysContainer = nextDaysContainer;
    this.i18n = i18n;
    this.offset = null;
  }

  async getWeather(latitude, longitude, units) {
    const params = {
      APPID: this.apiKey,
      units: (units ? 'metric' : 'imperial'),
      lat: latitude,
      lon: longitude,
    };
    const url = urlBuilder(this.api, params);
    const responce = await fetch(url);
    const json = await responce.json();
    this.offset = json.city.timezone;
    const curDate = getLocalTime(this.offset);
    const result = {
      today: {
        temp: Math.round(json.list[0].main.temp),
        feelsLike: Math.round(json.list[0].main.feels_like),
        wind: Math.round(json.list[0].wind.speed),
        humidity: json.list[0].main.humidity,
        code: json.list[0].weather[0].id,
      },
      otherDays: [],
    };

    json.list.forEach((e) => {
      const date = getLocalTime(this.offset, e.dt * 1000);
      const hour = date.getHours();
      if (date.getDate() !== curDate.getDate() && [9, 15, 21].indexOf(hour) !== -1) {
        let dayObj = result.otherDays.find((s) => s.dayOfWeek === date.getDay());
        if (!dayObj) {
          if (result.otherDays.length >= 3) {
            return;
          }
          dayObj = { dayOfWeek: date.getDay() };
          result.otherDays.push(dayObj);
        }
        const obj = {
          code: e.weather[0].id,
          temp: Math.round(e.main.temp),
        };
        switch (hour) {
          case 9:
            dayObj.morning = obj;
            break;
          case 15:
            dayObj.day = obj;
            break;
          case 21:
            dayObj.evening = obj;
            break;
          default:
            break;
        }
      }
    });
    this.drowWeather(result);
  }

  drowWeather(result) {
    console.log(result);
    this.todayContainer.innerHTML = `
      <p>${result.today.temp}°</p>
      ${svg[result.today.code]}
      <div class="details upper">
        <p data-i18n='weather.${result.today.code}'>${this.i18n.getTranslation(`weather.${result.today.code}`)}</p>
        <p><span data-i18n='feel'>${this.i18n.getTranslation('feel')}</span>: ${result.today.feelsLike}°</p>
        <p><span data-i18n='wind'>${this.i18n.getTranslation('wind')}</span>: ${result.today.wind}<span data-i18n='ms' style="text-transform: lowercase">${this.i18n.getTranslation('ms')}</span></p>
        <p><span data-i18n='humidity'>${this.i18n.getTranslation('humidity')}</span>: ${result.today.humidity}%</p>
      </div>`;

    let inner = '';
    result.otherDays.forEach((e) => {
      inner += `
        <div>
          <p data-i18n='day.${e.dayOfWeek}'>${this.i18n.getTranslation(`day.${e.dayOfWeek}`)}</p>
          <p>${e.day.temp}°</p>
          ${svg[e.day.code]}
        </div>
      `;
    });
    this.nextDaysContainer.innerHTML = inner;
  }
}
