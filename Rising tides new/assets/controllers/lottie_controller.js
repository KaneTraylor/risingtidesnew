import { Controller } from "@hotwired/stimulus"
import "@lottiefiles/lottie-player";

export default class extends Controller {
  static get targets() {
    return [ 'lottie' ]
  }

  connect() {
    const lottiePlayer = this.lottiePlayer();
    this.colorizationLottie()

    let hasAlreadyPlayed = false;

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAlreadyPlayed) {
        if (lottiePlayer) {
          hasAlreadyPlayed = true;
          if (lottiePlayer.getAttribute('play') != 'false') {
            lottiePlayer.play();
          }
          if (this.element.dataset.playMobile === 'true') {
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return

            lottiePlayer.play();
          }
        }
      }
    }, {
      root: null,
      threshold: 0.6,
    })

    observer.observe(lottiePlayer);
  }

  colorizationLottie() {
    const player = this.lottiePlayer();
    let colors = {
      purple: '#D5C8FB',
      mint: '#CEF6E9',
      peach: '#FFD6BC',
      mustard: '#F4F8AC',
    }
    let colorsLight = {
      purple: '#EFE9FE',
      mint: '#DFF9F0',
      peach: '#FFEADD',
      mustard: '#FDFFD0',
    }
    const bgColor = player.dataset.color
    if (bgColor) {
      player.addEventListener('frame', (e) => {
        player.shadowRoot.querySelectorAll('[fill="rgb(239,233,254)"]').forEach((e) => {e.setAttribute('fill', colorsLight[bgColor])});
        if (!player.shadowRoot.querySelectorAll('[fill="rgb(213,200,251)"]').forEach((e) => {e.setAttribute('fill', colors[bgColor])})) {
          player.shadowRoot.querySelectorAll('[stroke="rgb(213,200,251)"]').forEach((e) => {e.setAttribute('stroke', colors[bgColor])})
        }
      });
    }

    player.addEventListener('frame', (e) => {
      player.classList.add('transition-all', 'duration-500', 'opacity-100');
    });
  }

  lottiePlayer() {
    if (this.hasLottieTarget) {
      return this.lottieTarget;
    } else {
      return this.element;
    }
  }

  fireLoop() {
    this.lottiePlayer().play()
    this.lottiePlayer().setLooping(true)
  }

  killLoop() {
    this.lottiePlayer().stop()
    this.lottiePlayer().setLooping(false)
  }
};
