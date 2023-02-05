import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return [ 'container', 'right', 'left', 'leftmobile', 'rightmobile' ]
  }

  connect() {

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {

        document.addEventListener('scroll', () => {

          const value = window.scrollY*0.08
          const valueMobile = window.scrollY*0.04

          if (window.innerWidth > 678) {

            this.rightTarget.style.transform = `translate(${this.maxValue(value, 400)}px,-${this.maxValue(value, 150)}px)`;
            this.leftTarget.style.transform = `translate(-${this.maxValue(value, 200)}px,${this.maxValue(value, 150)}px)`;
            [this.leftTarget, this.rightTarget].forEach((element) => {
              element.style.transition = ".2s ease-out";
            })

          } else {

            this.rightmobileTarget.style.transform = `translate(${this.maxValue(valueMobile, 80)}px,-${this.maxValue(valueMobile, 70)}px)`;
            this.leftmobileTarget.style.transform = `translate(-${this.maxValue(valueMobile, 60)}px,${this.maxValue(valueMobile, 55)}px)`;
            [this.leftmobileTarget, this.rightmobileTarget].forEach((element) => {
              element.style.transition = ".2s ease-out";
            })

          }

        })   
      }
    }, options);

    observer.observe(this.containerTarget);
  }

  maxValue(value, limit) {
    return Math.min(value, limit);
  }

};
