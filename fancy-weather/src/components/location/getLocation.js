import './map.scss';

import drowMap from './map';
// import Modal from '../modal';
import { urlBuilder } from '../utils';

export default class Location {
  constructor(input, coordinatesElement, placeElement, i18n, loadWeather, language) {
    this.apiIpinfo = 'https://ipinfo.io/json?';
    this.keyIpinfo = '0c1bd19d46aa74';

    this.urlOpencage = 'https://api.opencagedata.com/geocode/v1/json';
    this.apiKeyOpencage = 'c6b6da0f80f24b299e08ee1075f81aa5';

    this.latitude = null;
    this.longitude = null;
    this.coordinatesElement = coordinatesElement;
    this.placeElement = placeElement;
    this.input = input;
    this.i18n = i18n;
    this.loadWeather = loadWeather;
    this.country = null;
    this.city = null;
    this.country = null;
    this.language = language;
  }

  async getLocationFromIP() {
    try {
      const url = `${this.apiIpinfo}token=${this.keyIpinfo}`;
      const response = await fetch(url);
      if (response.status === 200) {
        const json = await response.json();
        const coord = json.loc.split(',');
        [this.latitude, this.longitude] = coord;
        await this.handleCoordinates();
      } else {
        // new Modal().drow('Error',
        // 'error location(разрешіте геопозіцію ілі перезагрузіте страніцу)');
        // console.log('error location');
      }
    } catch (error) {
      // new Modal().drow('Error', 'error location
      // catch(разрешіте геопозіцію ілі перезагрузіте страніцу)');
      // console.log('error location catch');
    }
  }

  async getLocationFromBrowser() {
    const promise = new Promise((resolve) => {
      const success = async (position, timerID) => {
        clearTimeout(timerID);
        this.latitude = String(position.coords.latitude);
        this.longitude = String(position.coords.longitude);
        await this.handleCoordinates();
        // console.log('success');
        resolve();
      };
      const error = () => {
        // console.log('Unable to retrieve your location');
      };

      if (!navigator.geolocation) {
        // console.log('Geolocation is not supported by your browser');
      } else {
        const timerID = setTimeout(async () => {
          await this.getLocationFromIP();
          resolve();
        }, 200);
        navigator.geolocation.getCurrentPosition((position) => success(position, timerID), error);
      }
    });
    await promise;
  }

  async getLocationFromInput() {
    const text = this.input.value;
    if (!text) {
      return;
    }
    const data = await this.getOpencagedata(text);
    if (data) {
      this.latitude = String(data[0].geometry.lat);
      this.longitude = String(data[0].geometry.lng);
      await this.handleCoordinates();
    }
  }

  drowCoordinates() {
    const latitude = this.latitude.split('.');
    const longitude = this.longitude.split('.');
    this.coordinatesElement.innerHTML = `<p><span data-i18n='lat'>${this.i18n.getTranslation('lat')}</span>: ${latitude[0]}°${latitude[1].slice(0, 2)}'</p><p><span data-i18n='lng'>${this.i18n.getTranslation('lng')}</span>: ${longitude[0]}°${longitude[1].slice(0, 2)}'</p>`;
  }

  async handleCoordinates() {
    await this.drowPlaceName();
    this.drowCoordinates();
    drowMap(this.longitude, this.latitude, this.language);
    await this.loadWeather(this.latitude, this.longitude);
  }

  async getOpencagedata(location) {
    const params = {
      q: location,
      key: this.apiKeyOpencage,
      pretty: 1,
      no_annotations: 1,
      language: this.language === 'en' ? 'en' : 'ru',
    };
    const response = await fetch(urlBuilder(this.urlOpencage, params));
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results;
      }
    }
    return null;
  }

  async drowPlaceName() {
    const data = await this.getOpencagedata(`${this.latitude}, ${this.longitude}`);
    console.log(data);
    this.city = data[0].components.city ? `${data[0].components.city.toUpperCase()}, ` : '';
    this.country = data[0].components.country;
    this.placeElement.innerHTML = `${this.city}${this.country.toUpperCase()}`;
  }
}
