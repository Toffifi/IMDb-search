import Image from './randomBackground/images';
import Spinner from './spinner/spinner';
import Location from './location/getLocation';
import I18n from './translation';
import Weather from './weather';


export default class App {
  constructor() {
    this.imageURL = 'https://images.unsplash.com/photo-1513786704796-b35842f0dca6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzODEyNH0';
    this.unit = true; // true = C, false = F
    this.city = 'Oslo';
    this.language = localStorage.getItem('lang') || 'en';
    this.i18n = new I18n();
    this.spinner = new Spinner();
    this.bImage = new Image(document.querySelector('body'));
    this.location = new Location(document.querySelector('.coordinates'), this.i18n);
    this.i18n.getLocalizationFiles(this.language);
    this.weather = new Weather(document.querySelector('#today'), document.querySelector('#next-days'), this.i18n);

    this.refreshButton = document.querySelector('.refresh');
    this.selectLanguage = document.querySelector('.dropdown-select');
  }

  async initialize() {
    this.selectLanguage.value = this.language;
    this.spinner.show();
    await this.bImage.loadImage();
    await this.location.getLocationFromBrowser();
    this.i18n.translate();
    await this.weather.getWeather('53.902334', '27.5618791', this.unit);
    this.spinner.hide();

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
  }
}
