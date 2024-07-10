import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';

// Containers
const header = document.querySelector('.page-header');
const headerContainer = header.querySelector('.page-header__container');
const headerContentContainer = headerContainer.querySelector('.trip-main');
const tripInfoContainer = headerContentContainer.querySelector('.trip-info');
const tripControlsFiltersContainer = headerContentContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

// Models
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

// Presenters
const tripPresenter = new TripPresenter({
  headerContentContainer: headerContentContainer,
  tripInfoContainer: tripInfoContainer,
  tripControlsFiltersContainer: tripControlsFiltersContainer,
  tripEventsContainer: tripEventsContainer,
  eventsModel,
  filterModel,
});

// init Presenters
tripPresenter.init();
