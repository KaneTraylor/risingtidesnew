import Reveal from 'stimulus-reveal-controller'

export default class extends Reveal {
  connect() {
    super.connect()
  }

  hideOthers(event) {
    const allItems = document.querySelectorAll('.menu-list');
    const openedList = event.currentTarget.parentNode;
    let otherItems = [];

    allItems.forEach((item) => {
      if (!item.classList.contains('hidden') && !(openedList === item.parentElement)) {
        otherItems.push(item);
      }
    })
    otherItems.forEach((item) => {
      item.classList.add('hidden');
      const imgArrow = item.parentElement.getElementsByTagName('img')[0];
      imgArrow.classList.toggle('active')
    })
  }
};
