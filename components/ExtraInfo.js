export default class ExtraInfo {

  constructor(element, userId, handleGetInfo) {
    this._element = element;
    this._userId = userId;
    this._handleGetInfo = handleGetInfo;

    this._dataAttribute = 'content';
    this._initialValue = '...';
  }

  async set() {
    this._element.dataset[this._dataAttribute] = this._initialValue;

    try {
      this._value = await this._handleGetInfo(this._userId);
      this._element.dataset[this._dataAttribute] = this._value;
    } catch (error) {
      console.log(error);
    }
  }
}
