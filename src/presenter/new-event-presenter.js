import { remove, render, RenderPosition } from '../framework/render.js';
import AddAndEditEventFormView from '../view/add-and-edit-event-form-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType, newEventInfo } from '../const.js';

export default class NewEventPresenter {
  #eventsListContainer = null;
  #event = null;
  #cities = [];
  #offers = [];
  #handleDataChange = null;
  #handleDestroy = null;

  #addAndEditEventFormComponent = null;

  constructor({ eventsListContainer, cities, offers, onDataChange, onDestroy }) {
    this.#eventsListContainer = eventsListContainer;
    this.#cities = cities;
    this.#offers = offers;
    this.#event = newEventInfo;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addAndEditEventFormComponent !== null) {
      return;
    }

    this.#addAndEditEventFormComponent = new AddAndEditEventFormView({
      event: this.#event,
      cities: this.#cities,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleCloseClick,
      isEditEventForm: false
    });

    render(this.#addAndEditEventFormComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addAndEditEventFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addAndEditEventFormComponent);
    this.#addAndEditEventFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  };

  #handleCloseClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
