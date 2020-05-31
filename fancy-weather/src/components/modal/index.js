import './modal.scss';

export default class Modal {
  constructor() {
    this.container = document.querySelector('body');
  }

  drow(h2, p) {
    this.blur = document.createElement('div');
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.blur.className = 'modal_blur';
    this.container.prepend(this.modal);
    this.container.prepend(this.blur);

    this.modal.innerHTML = `
    <i class="fas fa-times"></i>
    <h2>${h2}</h2>
    <p>${p}</p>
    `;
    document.querySelector('.modal i').addEventListener('click', () => {
      this.deleteModal();
    });
    this.blur.addEventListener('click', () => {
      this.deleteModal();
    });
  }

  deleteModal() {
    this.container.removeChild(this.modal);
    this.container.removeChild(this.blur);
  }
}
