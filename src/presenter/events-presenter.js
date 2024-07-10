import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsMessageView from '../view/trip-events-message-view.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

import { render, remove } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #tripEventsListComponent = new TripEventsListView();
  #sortComponent = null;
  #tripEventsMessageComponent = null;
  #cities = [];
  #offers = [];
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor({tripEventsContainer, eventsModel, filterModel, onNewEventDestroy}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      eventsListContainer: this.#tripEventsListComponent.element,
      cities: [...this.#eventsModel.cities],
      offers: [...this.#eventsModel.offers],
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredEvents.sort(sortByDate);
      case SortType.TIME_DOWN:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE_DOWN:
        return filteredEvents.sort(sortByPrice);
    }
    return filteredEvents;
  }

  init() {
    this.#cities = [...this.#eventsModel.cities];
    this.#offers = [...this.#eventsModel.offers];

    this.#renderEventsBoard();
  }

  createEvent() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data, this.#cities, this.#offers);
        break;
      case UpdateType.MINOR:
        this.#clearEventsBoard();
        this.#renderEventsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsBoard({resetSortType: true});
        this.#renderEventsBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (eventSortType) => {
    if (this.#currentSortType === eventSortType) {
      return;
    }

    this.#currentSortType = eventSortType;
    this.#clearEventsBoard();
    this.#renderEventsBoard();
  };

  #renderTripEvent(event, cities, offers) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event, cities, offers);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderTripEvents() {
    this.events.forEach((event) => {
      this.#renderTripEvent(event, this.#cities, this.#offers);
    });
  }

  #renderEventsBoard() {
    if (!this.events || this.events.length === 0) {
      this.#renderTripEventsList();
      this.#renderTripEventsMessage();
      return;
    }

    this.#renderSort();
    this.#renderTripEventsList();
    this.#renderTripEvents();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortEventType: this.#currentSortType
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderTripEventsList() {
    render(this.#tripEventsListComponent, this.#tripEventsContainer);
  }

  #renderTripEventsMessage() {
    this.#tripEventsMessageComponent = new TripEventsMessageView({ filterType: this.#filterType });
    render(this.#tripEventsMessageComponent, this.#tripEventsListComponent.element);
  }

  #clearEventsBoard({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);

    if (this.#tripEventsMessageComponent) {
      remove(this.#tripEventsMessageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }
}
