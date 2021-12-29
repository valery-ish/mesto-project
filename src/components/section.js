export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = Object.values(data);
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItemList(element) {
        this._container.append(element);
    }

    addItem(element) {
      this._container.prepend(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}
