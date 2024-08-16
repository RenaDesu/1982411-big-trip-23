import AbstractView from '../framework/view/abstract-view.js';
import {
  getFormattedEventDate,
  getEventDurationTime,
  getTotalEventPrice,
  getSelectedOffers,
  getCityById
} from '../utils/event.js';
import { DateFormat } from '../const.js';


function createTripEventsListItemOfferTemplate(offers) {
  let offerTemplate = '';
  if (offers && offers.length !== 0) {
    offers.forEach((offer) => {
      offerTemplate += `
      <li class="event__offer">
         <span class="event__offer-title">${offer.title}</span>
           &plus;&euro;&nbsp;
         <span class="event__offer-price">${offer.price}</span>
      </li>
      `;
    });
  }
  return offerTemplate;
}

function createTripEventButtonFav(isFavorite) {
  const favoriteActiveClass = isFavorite ? 'event__favorite-btn--active' : '';
  return `
  <button class="event__favorite-btn ${favoriteActiveClass}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`;
}

function createTripEventsListItemTemplate(event, cities, offers) {
  const { basePrice, dateFrom, dateTo, destination, type, isFavorite, offers: selectedOffersIds } = event;
  const cityName = getCityById(destination, cities).name;
  const selectedOffers = getSelectedOffers(type, [...selectedOffersIds], offers);

  const startDate = getFormattedEventDate(dateFrom, DateFormat.EVENT_DATE_FORMAT);
  const startDateForAttribute = getFormattedEventDate(dateFrom, DateFormat.EVENT_DATE_ATTRIBUTE_FORMAT);
  const startTime = getFormattedEventDate(dateFrom, DateFormat.EVENT_TIME_FORMAT);
  const startTimeForAttribute = getFormattedEventDate(dateFrom, DateFormat.EVENT_DATETIME_ATTRIBUTE_FORMAT);
  const endTime = getFormattedEventDate(dateTo, DateFormat.EVENT_TIME_FORMAT);
  const endTimeForAttribute = getFormattedEventDate(dateTo, DateFormat.EVENT_DATETIME_ATTRIBUTE_FORMAT);
  const durationTime = getEventDurationTime(dateFrom, dateTo);

  const totalPrice = getTotalEventPrice(basePrice, selectedOffers);

  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${startDateForAttribute}">${startDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${cityName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startTimeForAttribute}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${endTimeForAttribute}">${endTime}</time>
      </p>
      <p class="event__duration">${durationTime}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createTripEventsListItemOfferTemplate(selectedOffers)}
    </ul>
    ${createTripEventButtonFav(isFavorite)}
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>
  `;
}

export default class TripEventsListItemView extends AbstractView {
  #event = null;
  #cities = [];
  #offers = [];
  #handleOpenEditFormClick = null;
  #handleFavoriteClick = null;

  constructor({ event, cities, offers, onOpenEditFormClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#cities = cities;
    this.#offers = offers;
    this.#handleOpenEditFormClick = onOpenEditFormClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onOpenEditFormClickHandler);
    this.element.querySelector('.event__favorite-btn ')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripEventsListItemTemplate(this.#event, this.#cities, this.#offers);
  }

  #onOpenEditFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenEditFormClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
