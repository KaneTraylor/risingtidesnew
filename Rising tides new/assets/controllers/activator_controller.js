import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return [ 'activateMe' ]
  }

  activate(_event) {
    this.activateMeTarget.classList.toggle('active')
  }
};
