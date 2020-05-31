import './style.css';
import './weather.scss';

import { urlBuilder, getLocalTime } from '../utils';
import svg from './svgIcons';

export default class Weather {
  constructor(todayContainer, nextDaysContainer, i18n, errorHandler) {
    this.api = 'https://api.openweathermap.org/data/2.5/forecast';
    this.apiKey = ['bd3486a1576873e45af5d2bf30eb720b'];
    this.apiTrys = 0;

    this.todayContainer = todayContainer;
    this.nextDaysContainer = nextDaysContainer;
    this.errorHandler = errorHandler;
    this.i18n = i18n;
    this.offset = null;
    this.season = null;
    this.partOfTheDay = null;
  }

  async getWeather(latitude, longitude, units) {
    if (this.errorHandler.hasError) {
      return;
    }
    const params = {
      APPID: this.apiKey[this.apiTrys],
      units: (units ? 'metric' : 'imperial'),
      lat: latitude,
      lon: longitude,
    };
    const url = urlBuilder(this.api, params);
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        this.apiTrys = 0;
        const json = await response.json();
        this.offset = json.city.timezone;
        const curDate = getLocalTime(this.offset);
        this.getSeason(curDate);
        this.getPartOfTheDay(curDate);
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
          const date = new Date(e.dt * 1000);
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
        if (result.otherDays.length < 3) {
          this.errorHandler.showError('Error', '', 'errors.forecast');
          return;
        }
        this.drowWeather(result);
      } else if (response.status === 401 || response.status === 402 || response.status === 403) {
        this.apiTrys += 1;
        if (this.apiTrys <= this.apiKey.length) {
          await this.getWeather(latitude, longitude, units);
          return;
        }
        this.errorHandler.showError('Error', '', 'errors.badKey|OpenWeatherMap', true);
      } else {
        this.errorHandler.showError('Error', '', 'errors.forecast', true);
      }
    } catch (er) {
      this.errorHandler.showError('Error', '', 'errors.forecast', true);
    }
    this.apiTrys = 0;
  }

  drowWeather(result) {
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

    this.readeableForecast = [
      {
        str: `${result.today.temp}°,   `,
      },
      {
        tr: `weather.${result.today.code}`,
        str: ', ',
      },
      {
        tr: 'feel',
        str: ` ${result.today.feelsLike}°,   `,
      },
      {
        tr: 'wind',
        str: ` ${result.today.wind} м с,  `,
      },
      {
        tr: 'humidity',
        str: ` ${result.today.humidity}%, `,
      },
    ];
  }

  getSeason(curDate) {
    const month = curDate.getMonth();
    if (month <= 1 && month >= 11) {
      this.season = 'winter';
    } else if (month >= 2 && month <= 4) {
      this.season = 'spring';
    } else if (month >= 5 && month <= 7) {
      this.season = 'summer';
    } else {
      this.season = 'autumn';
    }
  }

  getPartOfTheDay(curDate) {
    const hour = curDate.getHours();
    if (hour < 6) {
      this.partOfTheDay = 'night';
    } else if (hour >= 6 && hour <= 11) {
      this.partOfTheDay = 'morning';
    } else if (hour >= 12 && hour <= 17) {
      this.partOfTheDay = 'afternoon';
    } else if (hour >= 18) {
      this.partOfTheDay = 'evening';
    }
  }
}
