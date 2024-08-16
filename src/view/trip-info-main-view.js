import AbstractView from '../framework/view/abstract-view.js';
import { getCityById, getFormattedEventDate } from '../utils/event.js';
import { getTripInfo } from '../utils/tripInfo.js';
import { DateFormat } from '../const.js';

function createTripInfoMainTemplate(events, cities) {
  const tripMainInfo = {
    cities: 'No trip data yet',
    dates: 'No trip data yet'
  };

  if (events && events.length === 1) {
    tripMainInfo.cities = getCityById(events[0].destination, cities).name;
    const startDate = getFormattedEventDate(events[0].dateFrom, DateFormat.MAIN_EVENT_DATE_START_FORMAT);
    const endDate = getFormattedEventDate(events[0].dateTo, DateFormat.MAIN_EVENT_DATE_END_FORMAT);
    tripMainInfo.dates = `${startDate} — ${endDate}`;
  } else {
    if (events && events.length) {
      const tripInfo = getTripInfo(events, cities);
      tripMainInfo.cities = tripInfo.cities;
      tripMainInfo.dates = tripInfo.dates;
    }
  }

  return `
  <div class="trip-info__main">
    <h1 class="trip-info__title">${tripMainInfo.cities}</h1>
    <p class="trip-info__dates">${tripMainInfo.dates}</p>
  </div>
  `;
}

export default class TripInfoMainView extends AbstractView {
  #events = null;
  #cities = [];

  constructor({ events, cities }) {
    super();
    this.#events = events;
    this.#cities = cities;
  }

  get template() {
    return createTripInfoMainTemplate(this.#events, this.#cities);
  }
}
