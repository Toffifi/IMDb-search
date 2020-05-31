import './modal.scss';

export default class Modal {
  constructor(i18n) {
    this.container = document.querySelector('body');
    this.addCloseCallbacks = [];
    this.i18n = i18n;
  }

  addCloseCallback(callback) {
    this.addCloseCallbacks.push(callback);
  }

  draw(h2, p, i18nKey, isError) {
    if (this.modal || this.blur) {
      this.deleteModal();
    }
    this.blur = document.createElement('div');
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.blur.className = 'modal_blur';
    this.container.prepend(this.modal);
    this.container.prepend(this.blur);

    this.modal.innerHTML = `
      <i class="fas fa-times"></i>
      <h2>${!isError ? h2 : this.i18n.getTranslation('error')}</h2>
      <p${i18nKey ? ` data-i18n='${i18nKey}'` : ''}>${i18nKey ? this.i18n.getTranslation(i18nKey) : p}</p>
    `;
    document.querySelector('.modal i').addEventListener('click', () => {
      this.deleteModal();
      this.addCloseCallbacks.forEach((e) => {
        e();
      });
    });
    this.blur.addEventListener('click', () => {
      this.deleteModal();
      this.addCloseCallbacks.forEach((e) => {
        e();
      });
    });
  }

  deleteModal() {
    this.container.removeChild(this.modal);
    this.container.removeChild(this.blur);
    this.modal = null;
    this.blur = null;
  }
}
