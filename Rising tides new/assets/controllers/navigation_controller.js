import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return ['nav', 'menu', 'searchbar', 'input', 'results', 'overlay', 'closeIcon']
  }

  connect() {
    const sections = document.querySelectorAll('main section, footer');

    if (document.location.pathname == '/de/tools/mehrwertsteuer-rechner') {
      this.setBackgroundColorFrom(sections[0])
    }
    else {
      window.addEventListener('scroll', () => {
        this.setBackgroundColor(sections)
      });
      this.setBackgroundColor(sections)
    }
  }

  toggle(event) {
    document.querySelector('body').classList.toggle('overflow-hidden')
    event.target.classList.toggle('open')
    this.menuTarget.classList.toggle('-translate-y-full')
  }

  expandSearchBar() {
    if (this.navTarget.classList.contains('expand-searchbar')) return
    this.menuTarget.classList.add('fade-out')
    this.overlayTarget.classList.add('reveal')
    document.querySelector('body').classList.add('overflow-hidden')
    setTimeout(() => {
      this.navTarget.classList.add('expand-searchbar')
      this.closeIconTarget.classList.remove('hidden')
    }, 100)
    setTimeout(() => {
      this.closeIconTarget.classList.remove('active')
    }, 200)
    setTimeout(() => {
      this.resultsTarget.classList.remove('hidden')
    }, 400)
  }

  collapseSearchBar() {
    if (this.navTarget.classList.contains('expand-searchbar')) {
      this.closeIconTarget.classList.add('active')
      this.searchbarTarget.classList.add('active')
      document.getElementById('results').innerHTML = ''
      this.resultsTarget.classList.add('hidden')
      this.inputTarget.value = ''
      this.overlayTarget.classList.remove('reveal')
      document.querySelector('body').classList.remove('overflow-hidden')
      setTimeout(() => {
        this.menuTarget.style.display = 'flex'
        this.closeIconTarget.classList.add('hidden')
      }, 200)
      setTimeout(() => {
        this.menuTarget.classList.remove('fade-out')
      }, 300)
      setTimeout(() => {
        this.menuTarget.style.display = ''
        this.navTarget.classList.remove('expand-searchbar')
        this.searchbarTarget.classList.remove('active')
      }, 350)
    }
  }

  setBackgroundColorFrom = (section) => {
    const backgroundColor = window.getComputedStyle(section).backgroundColor
    this.navTarget.style.backgroundColor = backgroundColor
  }

  setBackgroundColor = (sections) => {
    sections.forEach(section => {
      const backgroundColor = window.getComputedStyle(section).backgroundColor;
      if (window.scrollY >= (section.offsetTop - this.navTarget.offsetHeight) && window.scrollY < (section.offsetTop + section.offsetHeight - this.navTarget.offsetHeight)) {
        if (backgroundColor === 'rgba(0, 0, 0, 0)' || !backgroundColor) {
          this.navTarget.style.borderBottom = '1px solid transparent';
          this.navTarget.style.boxShadow = '0px 3px 6px 0px #1D1D1B0F';
        }
        else {
          this.navTarget.style.boxShadow = '';
          this.navTarget.style.borderBottom = '';
        }

        if (section.classList.contains('bg-primary-black')) {
          this.navTarget.classList.add('black')
        }
        else {
          this.navTarget.classList.remove('black')
        }
        if (backgroundColor === 'rgba(0, 0, 0, 0)') {
          this.navTarget.style.backgroundColor = 'rgb(255, 255, 255, 255)'
        } else {
          this.navTarget.style.backgroundColor = backgroundColor
        }
      }
    })
  }
};
