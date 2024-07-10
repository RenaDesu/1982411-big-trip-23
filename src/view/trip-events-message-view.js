import AbstractView from '../framework/view/abstract-view.js';
import { filterEmptyMessage } from '../const';


function createTripEventsMessageTemplate(data, isEventsListEmptyMessage) {
  if (isEventsListEmptyMessage) {
    return `
      <p class="trip-events__msg">${filterEmptyMessage[data]}</p>
    `;
  }
  return `
    <p class="trip-events__msg">${data}</p>
  `;
}

export default class TripEventsMessageView extends AbstractView {
  #message = null;
  #filterType = null;
  #isEventsListEmptyMessage = false;

  constructor({ message, filterType }) {
    super();
    this.#message = message;
    this.#filterType = filterType;
  }

  get template() {
    if (this.#filterType) {
      this.#isEventsListEmptyMessage = true;
      return createTripEventsMessageTemplate(this.#filterType, this.#isEventsListEmptyMessage);
    }
    return createTripEventsMessageTemplate(this.#message, this.#isEventsListEmptyMessage);
  }
}
