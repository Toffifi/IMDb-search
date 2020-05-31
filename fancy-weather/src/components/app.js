import Image from './randomBackground';
import Spinner from './spinner';
import Location from './location/getLocation';
import I18n from './translation';
import Weather from './weather';
import Clock from './clock';
import initKeyboard from './virtual-keyboard';
import ErrorHandler from './errorHandler';
import Modal from './modal';
import Speech from './speech';


export default class App {
  constructor() {
    this.unit = localStorage.getItem('unit') !== null ? JSON.parse(localStorage.getItem('unit')) : true; // true = C, false = F
    this.language = localStorage.getItem('langApp') || 'en';

    this.input = document.querySelector('#search-input');
    this.searchButton = document.querySelector('#search-button');
    this.clearInput = document.querySelector('#clear-button');
    this.speechButton = document.querySelector('#speech');
    this.refreshButton = document.querySelector('.refresh');
    this.selectLanguage = document.querySelector('.dropdown-select');
    this.unitChangeButtons = document.querySelectorAll('.toggle');
    this.playButton = document.querySelector('.play');

    this.i18n = new I18n();
    this.clock = new Clock(document.querySelector('#clock'), this.i18n);
    this.spinner = new Spinner();
    this.bImage = new Image(document.querySelector('body'));
    this.modal = new Modal(this.i18n);
    this.errorHandler = new ErrorHandler(this.modal);
    this.location = new Location(
      this.input,
      document.querySelector('.coordinates'),
      document.querySelector('.place'),
      this.i18n,
      this.loadWeather.bind(this),
      this.language,
      this.errorHandler,
    );
    this.weather = new Weather(
      document.querySelector('#today'),
      document.querySelector('#next-days'),
      this.i18n,
      this.errorHandler,
    );
    this.speech = new Speech(
      this.language,
      this.input,
      this.doTheSearch.bind(this),
      this.speechButton,
      this.sayIt.bind(this),
      this.playButton,
    );
  }

  async initialize() {
    this.selectLanguage.value = this.language;
    this.connectKeyboard();

    this.refreshButton.addEventListener('click', async () => {
      this.spinner.show();
      await this.bImage.loadImage(
        this.location.country,
        this.weather.season,
        this.weather.partOfTheDay,
      );
      this.spinner.hide();
    });

    this.selectLanguage.addEventListener('change', () => {
      this.language = this.selectLanguage.value;
      this.location.language = this.language;
      this.speech.lang = this.language;
      this.location.drowPlaceName();
      localStorage.setItem('langApp', this.language);
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

    this.searchButton.addEventListener('click', async () => {
      this.doTheSearch();
    });

    this.clearInput.addEventListener('click', () => {
      this.input.value = '';
    });

    this.speechButton.addEventListener('click', () => {
      this.speech.letsSpeech();
    });

    this.playButton.addEventListener('click', () => {
      this.sayIt();
    });

    this.spinner.show();
    await this.i18n.getLocalizationFiles(this.language);
    await this.location.getLocationFromBrowser();
    this.spinner.hide();
  }

  async loadWeather(lat, lon) {
    this.spinner.show();
    await this.weather.getWeather(lat, lon, this.unit);
    this.clock.offset = this.weather.offset;
    await this.bImage.loadImage(
      this.location.country,
      this.weather.season,
      this.weather.partOfTheDay,
    );
    this.spinner.hide();
  }

  connectKeyboard() {
    initKeyboard(this.input, document.querySelector('#keyboard'), this.doTheSearch.bind(this));
    const keyboardButton = document.querySelector('#open-keyboard');
    const keyboardContainer = document.querySelector('.keyboard-container');
    keyboardContainer.addEventListener('click', () => {
      this.input.focus();
    });
    keyboardButton.addEventListener('click', () => {
      keyboardContainer.classList.toggle('active-keyboard');
      keyboardButton.classList.toggle('active');
      this.input.focus();
    });
  }

  async doTheSearch() {
    this.spinner.show();
    await this.location.getLocationFromInput();
    this.spinner.hide();
    this.input.value = '';
  }

  sayIt() {
    if (this.weather.readeableForecast) {
      let str = `${this.location.country} ${this.location.city}: `;
      this.weather.readeableForecast.forEach((e) => {
        if (e.tr) {
          str += this.i18n.getTranslation(e.tr);
        }
        str += e.str;
      });
      if (str.length > 0) {
        this.speech.read(str);
      }
    }
  }
}
