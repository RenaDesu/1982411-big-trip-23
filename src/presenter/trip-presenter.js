import HeaderContentPresenter from '../presenter/header-content-presenter';
import TripEventsPresenter from '../presenter/events-presenter.js';
import AddEventButtonView from '../view/add-event-button-view.js';

export default class TripPresenter {
  #headerContentContainer = null;
  #tripInfoContainer = null;
  #tripControlsFiltersContainer = null;
  #tripEventsContainer = null;
  #headerContentPresenter = null;
  #tripEventsPresenter = null;
  #newEventButtonComponent = null;
  #eventsModel = null;
  #filterModel = null;

  constructor({ headerContentContainer, tripInfoContainer, tripControlsFiltersContainer, tripEventsContainer, eventsModel, filterModel }) {
    this.#headerContentContainer = headerContentContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripControlsFiltersContainer = tripControlsFiltersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventButtonComponent = new AddEventButtonView({
      onClick: this.#handleNewEventButtonClick,
    });

    this.#headerContentPresenter = new HeaderContentPresenter({
      headerContentContainer: this.#headerContentContainer,
      tripInfoContainer: this.#tripInfoContainer,
      tripControlsFiltersContainer: this.#tripControlsFiltersContainer,
      eventsModel: this.#eventsModel,
      filterModel: this.#filterModel,
      addEventButtonComp: this.#newEventButtonComponent
    });

    this.#tripEventsPresenter = new TripEventsPresenter({
      tripEventsContainer: this.#tripEventsContainer,
      eventsModel: this.#eventsModel,
      filterModel: this.#filterModel,
      onNewEventDestroy: this.#handleNewEventFormClose,
    });
  }

  init() {
    this.#headerContentPresenter.init();
    this.#tripEventsPresenter.init();
  }

  #handleNewEventButtonClick = () => {
    this.#tripEventsPresenter.createEvent();
    this.#newEventButtonComponent.element.disabled = true;
  };

  #handleNewEventFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };
}
