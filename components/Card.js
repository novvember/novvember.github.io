export default class Card {

  constructor(cardData, templateSelector) {
    this._title = cardData.title;
    this._text = cardData.text;
    this._date = cardData.date;
    this._link = cardData.link;
    this._image = cardData.image;

    this._isInProgress = cardData.isInProgress;
    this._hasBigImage = cardData.hasBigImage;
    this._isImportant = cardData.isImportant;

    this._templateSelector = templateSelector;

    this._cardSelector = '.card';

  }

  _getTemplate() {
    const element = document.querySelector(this._templateSelector)
                      .content
                      .querySelector(this._cardSelector)
                      .cloneNode(true);
    return element;
  }

  render() {
    this._element = this._getTemplate();

    if (this._isImportant) this._element.classList.add('card_important');

    const link = this._element.querySelector('.card__link');
    link.setAttribute('href', this._link);

    const image = this._element.querySelector('.card__image');
    if (this._hasBigImage) image.classList.add('card__image_size_l');
    image.setAttribute('src', this._image);

    const title = this._element.querySelector('.card__title');
    if (this._isInProgress) title.classList.add('add-icon', 'add-icon_type_block', 'add-icon_type_block_in-progress');
    const titleText = title.querySelector('span');
    titleText.innerHTML = this._title;

    const text = this._element.querySelector('.card__text');
    text.innerHTML = this._text;

    const date = this._element.querySelector('.card__date');
    date.innerHTML = this._date;

    return this._element;
  }
}
