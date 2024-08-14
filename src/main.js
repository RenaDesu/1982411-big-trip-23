import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';
import EventsApiService from './service/events-api-service.js';

const AUTHORIZATION = 'Basic gM6arY83qdo9be1j';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

// Containers
const header = document.querySelector('.page-header');
const headerContainer = header.querySelector('.page-header__container');
const headerContentContainer = headerContainer.querySelector('.trip-main');
const tripInfoContainer = headerContentContainer.querySelector('.trip-info');
const tripControlsFiltersContainer = headerContentContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

// Models
const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
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

// init Models
eventsModel.init();
