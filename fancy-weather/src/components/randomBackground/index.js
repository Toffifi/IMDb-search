
import { urlBuilder } from '../utils';

export default class Image {
  constructor(element) {
    this.api = 'https://api.unsplash.com/photos/random';
    this.apiKey = ['5QSGeho0iyo6Vlso8GbMJtnfumF5KZgDr3z8jJFCbLg', 'yMZSTnU1T_bzoqS7FXRVJLLpVqtAa7f0aFRzj0azZvw'];
    this.apiTrys = 0;
    this.imageReader = new FileReader();
    this.defaultImageUrl = 'https://images.unsplash.com/photo-1513786704796-b35842f0dca6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzODEyNH0';
    this.element = element;
  }

  async getUrl(...theme) {
    const params = {
      client_id: this.apiKey[this.apiTrys],
      orientation: 'landscape',
      query: theme.join(','),
    };
    const url = urlBuilder(this.api, params);
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        console.log(`theme background: ${params.query}`);
        this.apiTrys = 0;
        return response.json()
          .then((r) => (r ? r.urls.regular : undefined))
          .catch(() => undefined);
      }
      if (response.status === 401 || response.status === 402 || response.status === 403) {
        this.apiTrys += 1;
        if (this.apiTrys <= this.apiKey.length) {
          const imageUrl = await this.getUrl(...theme);
          return imageUrl;
        }
      }
    } finally {
      this.apiTrys = 0;
    }
    return undefined;
  }

  async getImage(url) {
    const image = await fetch(url)
      .then((r) => r.blob())
      .catch(() => undefined);
    if (!image) {
      return this.defaultImageUrl;
    }
    const promise = new Promise((resolve) => {
      this.imageReader.onload = () => resolve(this.imageReader.result);
      this.imageReader.readAsDataURL(image);
    });
    const result = await promise;
    return result;
  }

  async loadImage(...args) {
    let imageUrl = await this.getUrl((!args || !args.length) ? ['winter', 'night'] : args);
    if (!imageUrl) {
      imageUrl = this.defaultImageUrl;
    }
    const imageBase64 = await this.getImage(imageUrl);
    this.changeBackground(imageBase64);
  }

  changeBackground(imgBase64) {
    this.element.style.backgroundImage = `radial-gradient(ellipse, rgba(8,15,26,0.1), rgba(8,15,26,0.7)), url("${imgBase64}")`;
  }
}
