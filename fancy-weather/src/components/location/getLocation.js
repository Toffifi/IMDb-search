import './map.scss';

import drowMap from './map';
// import Modal from '../modal';
import { urlBuilder } from '../utils';

export default class Location {
  constructor(input, coordinatesElement, placeElement, i18n, loadWeather, language, errorHandler) {
    this.apiIpinfo = 'https://ipinfo.io/json';
    this.keyIpinfo = ['0c1bd19d46aa74'];
    this.ipinfoTrys = 0;

    this.urlOpencage = 'https://api.opencagedata.com/geocode/v1/json';
    this.apiKeyOpencage = ['c6b6da0f80f24b299e08ee1075f81aa5', '99470397f77f49468bcd13c386a1bd59'];
    this.opencageTrys = 0;

    this.coordinatesElement = coordinatesElement;
    this.placeElement = placeElement;
    this.input = input;
    this.errorHandler = errorHandler;
    this.i18n = i18n;
    this.loadWeather = loadWeather;
    this.language = language;

    this.latitude = null;
    this.longitude = null;
    this.country = null;
    this.city = null;
    this.country = null;
  }

  async getLocationFromIP() {
    if (this.errorHandler.hasError) {
      return;
    }
    const params = {
      token: this.keyIpinfo[this.ipinfoTrys],
    };
    try {
      const response = await fetch(urlBuilder(this.apiIpinfo, params));
      if (response.status === 200) {
        this.ipinfoTrys = 0;
        const json = await response.json();
        const coord = json.loc.split(',');
        [this.latitude, this.longitude] = coord;
        await this.handleCoordinates();
      } else if (response.status === 401 || response.status === 402 || response.status === 403) {
        this.ipinfoTrys += 1;
        if (this.ipinfoTrys <= this.keyIpinfo.length) {
          await this.getLocationFromIP();
          return;
        }
        this.errorHandler.showError('Error', '', 'errors.badKey|IpInfo', true);
      } else {
        this.errorHandler.showError('Error', '', 'errors.locationIp', true);
      }
    } catch (er) {
      this.errorHandler.showError('Error', '', 'errors.locationIp', true);
    }
    this.ipinfoTrys = 0;
  }

  async getLocationFromBrowser() {
    const promise = new Promise((resolve) => {
      const success = async (position, timerID) => {
        clearTimeout(timerID);
        if (this.errorHandler.hasError) {
          return;
        }
        this.latitude = String(position.coords.latitude);
        this.longitude = String(position.coords.longitude);
        await this.handleCoordinates();
        resolve();
      };

      if (navigator.geolocation) {
        const timerID = setTimeout(async () => {
          await this.getLocationFromIP();
          resolve();
        }, 200);
        navigator.geolocation.getCurrentPosition((position) => success(position, timerID));
      }
    });
    await promise;
  }

  async getLocationFromInput() {
    if (this.errorHandler.hasError) {
      return;
    }
    const text = this.input.value;
    if (!text) {
      return;
    }
    try {
      const data = await this.getOpencagedata(text);
      if (data) {
        try {
          this.latitude = String(data[0].geometry.lat);
          this.longitude = String(data[0].geometry.lng);
          await this.handleCoordinates();
        } catch (error) {
          this.errorHandler.showError('Error', '', `errors.noResults|${text}`, true);
        }
      } else {
        this.errorHandler.showError('Error', '', `errors.noResults|${text}`, true);
      }
    } catch (er) {
      this.errorHandler.showError('Error', '', 'errors.location', true);
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
    drowMap(this.longitude, this.latitude, this.language, this.errorHandler);
    await this.loadWeather(this.latitude, this.longitude);
  }

  async getOpencagedata(location) {
    if (this.errorHandler.hasError) {
      return null;
    }
    const params = {
      q: location,
      key: this.apiKeyOpencage[this.opencageTrys],
      pretty: 1,
      no_annotations: 1,
      language: this.language === 'en' ? 'en' : 'ru',
    };
    try {
      const response = await fetch(urlBuilder(this.urlOpencage, params));
      if (response.status === 200) {
        this.opencageTrys = 0;
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results;
        }
      } else if (response.status === 401 || response.status === 402 || response.status === 403) {
        this.opencageTrys += 1;
        if (this.opencageTrys <= this.apiKeyOpencage.length) {
          const res = await this.getOpencagedata(location);
          return res;
        }
        this.errorHandler.showError('Error', '', 'errors.badKey|OpenCageData', true);
      } else {
        this.errorHandler.showError('Error', '', 'errors.location', true);
      }
    } catch (error) {
      this.errorHandler.showError('Error', '', 'errors.location', true);
    }
    this.opencageTrys = 0;
    return null;
  }

  async drowPlaceName() {
    const data = await this.getOpencagedata(`${this.latitude}, ${this.longitude}`);
    if (data && data[0].components && (data[0].components.city || data[0].components.country)) {
      this.city = data[0].components.city;
      this.country = data[0].components.country;
      if (this.city && this.country) {
        this.placeElement.innerHTML = `${this.city.toUpperCase()}, ${this.country.toUpperCase()}`;
      } else {
        this.placeElement.innerHTML = `${(this.city || this.country).toUpperCase()}`;
      }
    }
  }
}
