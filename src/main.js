import HeaderContentPresenter from './header-content-presenter';
import TripEventsPresenter from './trip-events-presenter';

// Containers
const header = document.querySelector('.page-header');
const headerContainer = header.querySelector('.page-header__container');
const headerContentContainer = headerContainer.querySelector('.trip-main');
const tripInfoContainer = headerContentContainer.querySelector('.trip-info');
const tripControlsFiltersContainer = headerContentContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

// Presenters
const headerContentPresenter = new HeaderContentPresenter({
  headerContentContainer: headerContentContainer,
  tripInfoContainer: tripInfoContainer,
  tripControlsFiltersContainer: tripControlsFiltersContainer
});
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: tripEventsContainer});

// init Presenters
headerContentPresenter.init();
tripEventsPresenter.init();
