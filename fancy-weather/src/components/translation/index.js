export default class I18n {
  constructor() {
    this.data = null;
  }

  async getLocalizationFiles(lang) {
    this.data = await (await fetch(`/localization/${lang}.json`)).json();
  }

  translate() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((e) => {
      e.textContent = this.getTranslation(e.dataset.i18n);
    });
  }

  getTranslation(key) {
    const keys = key.split('.');
    let trans = this.data;
    while (keys.length) {
      trans = trans[keys.shift()];
    }
    return trans;
  }

  async changeLang(lang) {
    await this.getLocalizationFiles(lang);
    this.translate();
  }
}
