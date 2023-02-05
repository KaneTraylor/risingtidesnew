import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return [ 'big', 'small', 'section' ]
  }

  connect() {
    if (!this.hasBigTarget && !this.hasSmallTarget) return;

    [this.bigTarget, this.smallTarget].forEach((element) => {
      element.style.transform = 'translate(0)';
      element.style.opacity = 1;
    });

    document.addEventListener('scroll', (event) => {
      const headerHeight = document.querySelector('header').offsetHeight;
      const section = this.sectionTarget;
      const top = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY + headerHeight > top && window.scrollY < top + sectionHeight - headerHeight) {
        const value = window.scrollY - top;
        parralaxEffect(value);
      }
    });

    const parralaxEffect = (value) => {
      this.bigTarget.style.transform = `translateY(-${value * 0.1}px)`;
      this.smallTarget.style.transform = `translateY(${value * 0.1}px)`;
    };
  }
};
