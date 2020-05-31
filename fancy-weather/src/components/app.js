import Image from './randomBackground';
import Spinner from './spinner';
import Location from './location/getLocation';
import I18n from './translation';
import Weather from './weather';
import Clock from './clock';


export default class App {
  constructor() {
    this.imageURL = 'https://images.unsplash.com/photo-1513786704796-b35842f0dca6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzODEyNH0';
    this.unit = localStorage.getItem('unit') !== null ? JSON.parse(localStorage.getItem('unit')) : true; // true = C, false = F
    this.city = 'Oslo';
    this.language = localStorage.getItem('lang') || 'en';
    this.i18n = new I18n();
    this.clock = new Clock(document.querySelector('#clock'), this.i18n);
    this.spinner = new Spinner();
    this.bImage = new Image(document.querySelector('body'));
    this.location = new Location(document.querySelector('.coordinates'), this.i18n, this.loadWeather.bind(this));
    this.i18n.getLocalizationFiles(this.language);
    this.weather = new Weather(document.querySelector('#today'), document.querySelector('#next-days'), this.i18n);

    this.refreshButton = document.querySelector('.refresh');
    this.selectLanguage = document.querySelector('.dropdown-select');
    this.unitChangeButtons = document.querySelectorAll('.toggle');
  }

  async initialize() {
    this.selectLanguage.value = this.language;
    this.refreshButton.addEventListener('click', async () => {
      this.spinner.show();
      await this.bImage.loadImage('Belarus', 'winter', 'afternoon');
      this.spinner.hide();
    });

    this.selectLanguage.addEventListener('change', () => {
      this.language = this.selectLanguage.value;
      localStorage.setItem('lang', this.language);
      this.i18n.changeLang(this.language);
    });
    this.unitChangeButtons.forEach((e) => {
      if (JSON.parse(e.value) === this.unit) {
        e.checked = JSON.parse(e.value) === this.unit;
      }
      e.addEventListener('change', () => {
        this.unit = JSON.parse(e.value);
        localStorage.setItem('unit', this.unit);
        this.weather.getWeather(this.location.latitude, this.location.longitude, this.unit);
      });
    });


    this.spinner.show();
    await this.bImage.loadImage();
    await this.location.getLocationFromBrowser();
    this.spinner.hide();
  }

  async loadWeather(lat, lon) {
    this.spinner.show();
    await this.weather.getWeather(lat, lon, this.unit);
    this.clock.offset = this.weather.offset;
    this.spinner.hide();
  }
}
