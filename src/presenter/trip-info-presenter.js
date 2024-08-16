import { remove, render, RenderPosition } from '../framework/render.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #events = null;
  #offers = [];
  #cities = [];

  #tripInfoMainComponent = null;
  #tripInfoCostComponent = null;

  constructor({ tripInfoContainer, events, offers, cities }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#events = events;
    this.#offers = offers;
    this.#cities = cities;
  }

  init() {
    this.#tripInfoMainComponent = new TripInfoMainView({
      events: this.#events,
      cities: this.#cities
    });

    this.#tripInfoCostComponent = new TripInfoCostView({
      events: this.#events,
      offers: this.#offers,
    });

    render(this.#tripInfoMainComponent, this.#tripInfoContainer, RenderPosition.BEFOREBEGIN);
    render(this.#tripInfoCostComponent, this.#tripInfoContainer, RenderPosition.BEFOREBEGIN);
  }

  destroy() {
    remove(this.#tripInfoMainComponent);
    remove(this.#tripInfoCostComponent);
    this.#tripInfoMainComponent = null;
    this.#tripInfoCostComponent = null;
  }
}
