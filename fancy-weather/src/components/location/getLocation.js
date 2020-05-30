import drowMap from './map';

export default class Location {
  constructor(element, i18n) {
    this.api = 'https://ipinfo.io/json?';
    this.key = '0c1bd19d46aa74';
    this.latitude = null;
    this.longitude = null;
    this.element = element;
    this.i18n = i18n;
  }

  async getLocationFromIP() {
    try {
      const url = `${this.api}token=${this.key}`;
      const response = await fetch(url);
      if (response.status === 200) {
        const json = await response.json();
        const coord = json.loc.split(',');
        [this.latitude, this.longitude] = coord;
        this.drowCoordinates();
        drowMap(this.longitude, this.latitude);
      } else {
        console.log('error location');
      }
    } catch (error) {
      console.log('error location catch');
    }
  }

  async getLocationFromBrowser() {
    const promise = new Promise((resolve) => {
      const success = (position, timerID) => {
        clearTimeout(timerID);
        this.latitude = String(position.coords.latitude);
        this.longitude = String(position.coords.longitude);
        this.drowCoordinates();
        drowMap(this.longitude, this.latitude);
        console.log('success');
        resolve();
      };
      const error = () => {
        console.log('Unable to retrieve your location');
      };

      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
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

  drowCoordinates() {
    const latitude = this.latitude.split('.');
    const longitude = this.longitude.split('.');
    this.element.innerHTML = `<p><span data-i18n='lat'>${this.i18n.getTranslation('lat')}</span>: ${latitude[0]}°${latitude[1].slice(0, 2)}'</p><p><span data-i18n='lng'>${this.i18n.getTranslation('lng')}</span>: ${longitude[0]}°${longitude[1].slice(0, 2)}'</p>`;
  }
}
