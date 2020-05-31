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
    const keys = key.split('|')[0].split('.');
    const valArr = key.split('|').slice(1);
    let trans = this.data;
    while (keys.length) {
      trans = trans[keys.shift()];
    }
    for (let i = 0; i < valArr.length; i += 1) {
      trans = trans.replace(`{${i}}`, valArr[i]);
    }
    return trans;
  }

  async changeLang(lang) {
    await this.getLocalizationFiles(lang);
    this.translate();
  }
}
