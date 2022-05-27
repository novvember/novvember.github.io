export default class Section {

  constructor(itemsData, containerElement, handleRenderItem) {
    this._itemsData = itemsData;
    this._containerElement = containerElement;
    this._handleRenderItem = handleRenderItem;
  }

  renderItems() {
    this._itemsData.forEach(itemData => {
      this._containerElement.append( this._handleRenderItem(itemData) );
    });
  }
}
