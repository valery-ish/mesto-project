import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageModal, imageFigcaption) {
      super(popupSelector);
      this.imageModal = imageModal;
      this.imageFigcaption = imageFigcaption;
  }

  openPopup(evt) {
      super.openPopup();
      const currentImageModal = this.selector.querySelector(this.imageModal);
      const currentIimageFigcaption = this.selector.querySelector(this.imageFigcaption);
      currentImageModal.src = evt.src;
      currentImageModal.alt = evt.alt;
      currentIimageFigcaption.textContent = evt.alt;
  }
}
