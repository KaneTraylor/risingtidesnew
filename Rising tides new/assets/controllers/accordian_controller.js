import { Controller } from "@hotwired/stimulus"

export default class extends Controller {                               
    static get targets() {
      return ['accordion']
    }

    connect() {
      this.accordionTargets.forEach((accordion) => {
        if (accordion.classList.contains('open-on-load')) {
          this.openAccordion(accordion);
        }
        const openSelectedAccordion = accordion.dataset.open
        if (openSelectedAccordion === 'open') {
          this.openAccordion(accordion);
        }
        const title = accordion.querySelector(".accordion-title");
        const content = accordion.querySelector(".accordion-menu");
        title.addEventListener('click', (event) => {
          if (content.style.maxHeight) {
            const content = accordion.querySelector(".accordion-menu")
            content.style.maxHeight = null
            title.classList.remove('open');
            this.rotateArrow(accordion, false)
          } else {
            this.accordionTargets.forEach((accordion) => this.closeAccordion(accordion))
            this.openAccordion(accordion);
          }
        });
      });
    }

    closeAccordion(accordion) {
      const content = accordion.querySelector(".accordion-menu");
      const title = accordion.querySelector(".accordion-title");
      content.style.maxHeight = null;
      title.classList.remove('open');
      this.rotateArrow(accordion, false)
    }

    openAccordion(accordion) {
      const title = accordion.querySelector(".accordion-title");
      const content = accordion.querySelector(".accordion-menu");
      content.style.maxHeight = content.scrollHeight + "px";
      title.classList.add('open');
      this.rotateArrow(accordion);
    };

    // Used in the case of pricing, accordion inside accordion
    toggleDropdownCard(dropdown) {
      const title = dropdown.querySelector(".pricing-dropdown-js");
      title.addEventListener('click', (e) => {
        const body = dropdown.querySelector(".card-body")
        body.classList.toggle('hidden');
        if (body && body.classList.contains('hidden')) {
          this.rotateArrow(dropdown, false)
        } else {
          this.rotateArrow(dropdown)
        }
      })

    }

    
    rotateArrow(accordion, rotate = true) {
      const arrow = accordion.querySelector('.accordion-arrow');
      if (rotate) {
        arrow.classList.add("rotate-180", "duration-500", "ease-out")
      } else {
        arrow.classList.remove("rotate-180", "duration-500", "ease-out")      
      }
    }
};
