import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortTemplate(sortEventType) {
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input
    id="sort-day"
    class="trip-sort__input  visually-hidden"
    type="radio"
    name="trip-sort"
    value="sort-day"
    data-sort-type="${SortType.DEFAULT}"
    ${sortEventType === SortType.DEFAULT ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input
    id="sort-time"
    class="trip-sort__input  visually-hidden"
    type="radio"
    name="trip-sort"
    value="sort-time"
    data-sort-type="${SortType.TIME_DOWN}"
    ${sortEventType === SortType.TIME_DOWN ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input
    id="sort-price"
    class="trip-sort__input  visually-hidden"
    type="radio"
    name="trip-sort"
    value="sort-price"
    data-sort-type="${SortType.PRICE_DOWN}"
    ${sortEventType === SortType.PRICE_DOWN ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
  </form>
  `;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #sortEventType = null;

  constructor({ onSortTypeChange, sortEventType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sortEventType = sortEventType;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortEventType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
