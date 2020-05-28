export default class Spinner {
  constructor() {
    this.blur = document.querySelector('.blur');
    this.spinner = document.querySelector('.lds-ripple');
  }

  show() {
    this.blur.style.display = 'inline';
    this.spinner.style.display = 'inline';
  }

  hide() {
    this.blur.style.display = 'none';
    this.spinner.style.display = 'none';
  }
}
