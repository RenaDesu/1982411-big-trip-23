import { render, replace, remove } from '../framework/render.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import AddAndEditEventFormView from '../view/add-and-edit-event-form-view.js';
import { Mode, UserAction, UpdateType } from '../const.js';
import { isDatesEqual, isPriceEqual } from '../utils/event.js';


export default class EventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventsListItemComponent = null;
  #addAndEditEventFormComponent = null;

  #event = null;
  #cities = [];
  #offers = [];
  #mode = Mode.DEFAULT;

  constructor({ eventListContainer, onDataChange, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event, cities, offers) {
    this.#event = event;
    this.#cities = cities;
    this.#offers = offers;

    const prevEventsListItemComponent = this.#eventsListItemComponent;
    const prevAddAndEditEventFormComponent = this.#addAndEditEventFormComponent;

    this.#eventsListItemComponent = new TripEventsListItemView({
      event: this.#event,
      cities: this.#cities,
      offers: this.#offers,
      onOpenEditFormClick: this.#handleOpenEditFormClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });
    this.#addAndEditEventFormComponent = new AddAndEditEventFormView({
      event: this.#event,
      cities: this.#cities,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onDeleteClick: this.#handleDeleteClick,
      isEditEventForm: true,
    });

    if (prevEventsListItemComponent === null || prevAddAndEditEventFormComponent === null) {
      render(this.#eventsListItemComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventsListItemComponent, prevEventsListItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#addAndEditEventFormComponent, prevAddAndEditEventFormComponent);
    }

    remove(prevEventsListItemComponent);
    remove(prevAddAndEditEventFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#addAndEditEventFormComponent.reset(this.#event);
      this.#replaceFormToEventItem();
    }
  }

  destroy() {
    remove(this.#eventsListItemComponent);
    remove(this.#addAndEditEventFormComponent);
  }

  #replaceEventItemToForm() {
    replace(this.#addAndEditEventFormComponent, this.#eventsListItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEventItem() {
    replace(this.#eventsListItemComponent, this.#addAndEditEventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#addAndEditEventFormComponent.reset(this.#event);
      this.#replaceFormToEventItem();
    }
  };

  #handleOpenEditFormClick = () => {
    this.#replaceEventItemToForm();
  };

  #handleFavoriteClick = () => {
    const changedData = { ...this.#event, isFavorite: !this.#event.isFavorite };
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      changedData
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#event.dateFrom, update.dateFrom) || !isDatesEqual(this.#event.dateTo, update.dateTo) ||
      !isPriceEqual(this.#event.basePrice, update.basePrice);
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToEventItem();
  };

  #handleFormClose = () => {
    this.#addAndEditEventFormComponent.reset(this.#event);
    this.#replaceFormToEventItem();
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };
}
