import AbstractView from '../framework/view/abstract-view.js';
import { getTripInfoCost } from '../utils/tripInfo.js';
import { getSelectedOffers, getTotalEventPrice } from '../utils/event.js';

function createTripInfoCostTemplate(events, allOffers) {
  let price = 0;

  if (events && events.length === 1) {
    const { basePrice, type, offers: selectedOffersIds } = events[0];
    const selectedOffers = getSelectedOffers(type, [...selectedOffersIds], allOffers);
    price = getTotalEventPrice(basePrice, selectedOffers);
  } else {
    if (events && events.length) {
      price = getTripInfoCost(events, allOffers);
    }
  }

  return `
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>
  `;
}

export default class TripInfoCostView extends AbstractView {
  #events = null;
  #offers = [];

  constructor({ events, offers }) {
    super();
    this.#events = events;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoCostTemplate(this.#events, this.#offers);
  }
}
