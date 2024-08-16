import FilterPresenter from '../presenter/filter-presenter.js';
import TripInfoPresenter from '../presenter/trip-info-presenter.js';
import { UpdateType } from '../const.js';

import { render } from '../framework/render.js';

export default class HeaderContentPresenter {
  #headerContentContainer = null;
  #tripInfoContainer = null;
  #tripControlsFiltersContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #filterPresenter = null;
  #addEventButtonComp = null;
  #tripInfoPresenter = null;

  constructor({headerContentContainer, tripInfoContainer, tripControlsFiltersContainer, eventsModel, filterModel, addEventButtonComp}) {
    this.#headerContentContainer = headerContentContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripControlsFiltersContainer = tripControlsFiltersContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#tripControlsFiltersContainer,
      filterModel: this.#filterModel,
      eventsModel: this.#eventsModel
    });
    this.#addEventButtonComp = addEventButtonComp;
    this.#eventsModel.addObserver(this.#handleModelUpdate);
  }

  init() {
    this.#render();
  }

  #render() {
    this.#renderTripInfo();
    this.#renderFilters();
    render(this.#addEventButtonComp, this.#headerContentContainer);
  }

  #renderFilters() {
    this.#filterPresenter.init();
  }

  #renderTripInfo() {
    this.#tripInfoPresenter = new TripInfoPresenter({
      tripInfoContainer: this.#tripInfoContainer,
      events: this.#eventsModel.events,
      offers: this.#eventsModel.offers,
      cities: this.#eventsModel.cities
    });
    this.#tripInfoPresenter.init();
  }

  #clearTripInfo() {
    if (this.#tripInfoPresenter) {
      this.#tripInfoPresenter.destroy();
      this.#tripInfoPresenter = null;
    }
  }

  #handleModelUpdate = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#clearTripInfo();
        this.#renderTripInfo();
        break;
    }
  };
}
