import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return ['container', 'top', 'right', 'left', 'topmobile', 'leftmobile', 'rightmobile']
  }

  connect() {
    const animatebankingCards = this.animatebankingCards.bind(this)
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        document.addEventListener('scroll', animatebankingCards)
      }
      else {
        document.removeEventListener('scroll', animatebankingCards)
      }
    }, options);

    observer.observe(this.containerTarget);
  }

  maxValue(value, limit) {
    return Math.min(value, limit);
  }

  animatebankingCards() {
    const value = ((this.containerTarget.offsetTop - (this.containerTarget.offsetTop * 0.1)) - window.scrollY) * -0.05

    if (window.innerWidth > 767) {
      this.topTarget.style.transform = `translate(-${this.maxValue(value, 130)}px,${this.maxValue(value, 100)}px)`;
      this.rightTarget.style.transform = `translate(-${this.maxValue(value, 100)}px,-${this.maxValue(value, 80)}px)`;
      this.leftTarget.style.transform = `translate(${this.maxValue(value, 80)}px,-${this.maxValue(value, 120)}px)`;
      [this.leftTarget, this.topTarget, this.rightTarget].forEach((element) => {
        element.style.transition = ".5s ease-out";
      })
    } else {
      this.topmobileTarget.style.transform = `translate(-${this.maxValue(value, 45)}px,${this.maxValue(value, 45)}px)`;
      this.rightmobileTarget.style.transform = `translate(-${this.maxValue(value, 45)}px,-${this.maxValue(value, 30)}px)`;
      this.leftmobileTarget.style.transform = `translate(${this.maxValue(value, 60)}px,-${this.maxValue(value, 40)}px)`;
      [this.leftmobileTarget, this.topmobileTarget, this.rightmobileTarget].forEach((element) => {
        element.style.transition = ".5s ease-out";
      })
    }
  }
};
