import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static get targets() {
    return [ 'toggleButtons' ]
  }

  connect() {
    this.animateCards();
    this.toggleButtonsTargets.forEach((button, index) => {
      const associatedElement = document.getElementById(this.extractElementId(button));
      const otherElements = this.toggleButtonsTargets.map((b) => {
        return document.getElementById(this.extractElementId(b))
      }).filter((el) => el !== associatedElement)

      if(index !== 0) this.hideElement(associatedElement)
      if(index !== 0) this.untoggleButton(button)

      button.addEventListener('click', (event) => {
        event.preventDefault()
        this.toggleButton(button)
        this.toggleButtonsTargets.filter((b) => b !== button).forEach((otherButton) => this.untoggleButton(otherButton))

        this.showElement(associatedElement)
        otherElements.forEach((el) => this.hideElement(el))
      })
    });
  }

  animateCards() {
    this.addTransitionDelayToCards();
    const tabs = this.toggleButtonsTargets;
    const cards = document.querySelectorAll('.card-toggable');
    const animateCard = () => {
      cards.forEach(element => {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
  
        setTimeout(() => {
          element.style.transform = '';
          element.style.opacity = '';
        }, 100);
      });
    };
    let selectedTabId = 0;
    let translateElement = 0;
  
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (event) => {
        if (selectedTabId < index) {
          for (let i = selectedTabId; i < index; i++) {
            translateElement += tabs[i].getBoundingClientRect().width;
          }
          selectedTabId = index;
          animateCard();
        } else if (selectedTabId > index) {
          for (let i = selectedTabId; i > index; i--) {
            translateElement -= tabs[i - 1].getBoundingClientRect().width;
          }
          selectedTabId = index;
          animateCard();
        }
      });
    });
  }

  addTransitionDelayToCards() {
    const containers = document.querySelectorAll('.card-toggable-container');
    containers.forEach((container) => {
      const cards = container.querySelectorAll('.card-toggable');
      let delay = 0;
      cards.forEach((card, index) => {
        if (index != 0) {
          delay += 0.05
          card.style.transitionDelay = `${delay}s`;
        }
      })
    })
  }

  extractElementId(button) { return button.id.replace('button_', '') }

  untoggleButton(button) {
    button.classList.remove('btn-primary')
    button.classList.add('hover:bg-grey-100')
    button.classList.remove(button.dataset.backgroundColor)
  }

  toggleButton(button) {
    button.classList.add(button.dataset.backgroundColor)
    button.classList.remove('hover:bg-grey-100')
  }

  hideElement(el) { el.classList.add('hidden') }
  showElement(el) { el.classList.remove('hidden') }
};
