import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageModal, imageFigcaption) {
      super(popupSelector);
      this._imageModal = imageModal;
      this._imageFigcaption = imageFigcaption;
  }

  openPopup(title, link) {
      super.openPopup();
      const currentImageModal = this.selector.querySelector(this._imageModal);
      const currentIimageFigcaption = this.selector.querySelector(this._imageFigcaption);
      currentImageModal.src = link;
      currentImageModal.alt = title;
      currentIimageFigcaption.textContent = title;
  }
}
