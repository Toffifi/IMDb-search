import Image from './randomBackground/images';
import Spinner from './spinner/spinner';
import Location from './location/getLocation';


export default class App {
  constructor() {
    this.imageURL = 'https://images.unsplash.com/photo-1513786704796-b35842f0dca6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzODEyNH0';
    this.unit = true; // true = C, false = F
    this.city = 'Oslo';
    this.language = 'en';
    this.spinner = new Spinner();
    this.bImage = new Image(document.querySelector('body'));
    this.location = new Location(document.querySelector('.coordinates'));

    this.refreshButton = document.querySelector('.refresh');
  }

  async initialize() {
    this.spinner.show();
    await this.bImage.loadImage();
    this.spinner.hide();

    this.refreshButton.addEventListener('click', async () => {
      this.spinner.show();
      await this.bImage.loadImage('winter', 'night');
      this.spinner.hide();
    });

    await this.location.getLocationFromBrowser();
  }
}
