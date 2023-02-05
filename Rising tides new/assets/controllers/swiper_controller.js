import { Controller } from "@hotwired/stimulus"
import Swiper, { Pagination, Autoplay, Navigation } from 'swiper';

export default class extends Controller {
  static get targets() {
    return [ 'pagination', 'prev', 'next' ]
  }

  static get values() {
    return {
      options: Object
    }
  }

  connect() {
    let options = Object.keys(this.optionsValue).length > 0 ? this.optionsValue : {
      modules: [Pagination, Autoplay, Navigation],
      loop: false,
      simulateTouch: true,
      breakpoints: {
        1025: {
          slidesPerView: 3.3,
          spaceBetween: 24,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 24,
          centeredSlides: false,
        },
        375: {
          slidesPerView: 1.5,
          spaceBetween: 24,
          centeredSlides: false,
        },
        1: {
          spaceBetween: 8,
          slidesPerView: 1.5,
          centeredSlides: false,
        }
      },
      pagination: {
        el: this.paginationTarget,
        clickable: true
      }
    }
    if (this.hasPaginationTarget) {
      options = { ...options, ...{
        modules: [Pagination, Autoplay, Navigation],
        pagination: {
          el: this.paginationTarget,
          clickable: true
        }
      } }
    }
    if (this.hasPrevTarget && this.hasNextTarget) {
      options = { ...options, ...{
        modules: [Pagination, Autoplay, Navigation],
        navigation: {
          nextEl: this.nextTarget,
          prevEl: this.prevTarget,
        },
      } }
    }
    const swiper = new Swiper(this.element, options);
  }
};
