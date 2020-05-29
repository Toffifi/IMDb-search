export default class Location {
  constructor(element) {
    this.api = 'https://ipinfo.io/json?';
    this.key = '0c1bd19d46aa74';
    this.latitude = null;
    this.longitude = null;
    this.element = element;
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
      } else {
        console.log('error location');
      }
    } catch (error) {
      console.log('error location catch');
    }
  }

  getLocationFromBrowser() {
    const success = (position, timerID) => {
      clearTimeout(timerID);
      this.latitude = String(position.coords.latitude);
      this.longitude = String(position.coords.longitude);
      this.drowCoordinates();
      console.log('success');
      console.log(`https://www.openstreetmap.org/#map=18/${this.latitude}/${this.longitude}`);
    };
    const error = () => {
      console.log('Unable to retrieve your location');
    };

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      const timerID = setTimeout(() => this.getLocationFromIP(), 200);
      navigator.geolocation.getCurrentPosition((position) => success(position, timerID), error);
    }
  }

  drowCoordinates() {
    const latitude = this.latitude.split('.');
    const longitude = this.longitude.split('.');
    this.element.innerHTML = `<p>Latitude: ${latitude[0]}°${latitude[1].slice(0, 2)}'</p><p>Longitude: ${longitude[0]}°${longitude[1].slice(0, 2)}'</p>`;
  }
}
