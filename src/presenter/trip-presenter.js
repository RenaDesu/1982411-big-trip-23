import HeaderContentPresenter from '../presenter/header-content-presenter';
import TripEventsPresenter from '../presenter/events-presenter.js';
import AddEventButtonView from '../view/add-event-button-view.js';
import { UpdateType } from '../const.js';

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
  #isLoading = true;

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

    eventsModel.addObserver(this.#handleModelInitEvent);
    filterModel.addObserver(this.#handleModelInitEvent);
  }

  init() {
    this.#headerContentPresenter.init();
    this.#tripEventsPresenter.init();
    this.#disableNewEventButton();
  }

  #disableNewEventButton() {
    if (this.#isLoading) {
      this.#newEventButtonComponent.element.disabled = true;
    } else {
      this.#newEventButtonComponent.element.disabled = false;
    }
  }

  #handleNewEventButtonClick = () => {
    this.#tripEventsPresenter.createNewEvent();
    this.#newEventButtonComponent.element.disabled = true;
  };

  #handleNewEventFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleModelInitEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#disableNewEventButton();
        break;
    }
  };
}
