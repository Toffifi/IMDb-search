import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default class Slider {
  constructor(loadNextPage) {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      watchOverflow: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.50': {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },
      on: {
        slideChange: () => {
          loadNextPage(Math.floor(this.swiper.activeIndex / 10));
          console.log(this.swiper.activeIndex);
          console.log(Math.floor(this.swiper.activeIndex / 10));
        },
      },
    });
  }

  appendSlide(card) {
    this.swiper.appendSlide(card);
  }

  clearSlides() {
    this.swiper.removeAllSlides();
  }

  // init() {

  // }
}
