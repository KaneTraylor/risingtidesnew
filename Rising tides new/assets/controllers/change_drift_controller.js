import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    setTimeout(() => {
      this.changeDriftWidgetPosition();
    }, 1500)
  }

  changeDriftWidgetPosition() {
    const driftWidget = document.querySelector('.drift-frame-controller');
    if (driftWidget) {
      if (/tarifs/.test(window.location.href) && (window.innerWidth < 768)) {
        driftWidget.classList.add('mb-40')
      }
    }
  }
};
