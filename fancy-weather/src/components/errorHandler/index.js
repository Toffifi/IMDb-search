
export default class ErrorHandler {
  constructor(modal) {
    this.modal = modal;
    this.hasError = false;
    this.modal.addCloseCallback(this.clearError.bind(this));
  }

  showError(title, text, i18nKey) {
    this.modal.draw(title, text, i18nKey, true);
    this.hasError = true;
  }

  clearError() {
    this.hasError = false;
  }
}
