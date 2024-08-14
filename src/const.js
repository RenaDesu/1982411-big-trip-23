const EVENTS_COUNT = 4;

const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DateFormat = {
  EVENT_TIME_FORMAT: 'HH:mm',
  EVENT_DATE_FORMAT: 'MMM DD',
  EVENT_DATE_ATTRIBUTE_FORMAT: 'YYYY-MM-DD',
  EVENT_DATETIME_ATTRIBUTE_FORMAT: 'YYYY-MM-DDTHH:mm',
  MAIN_EVENT_DATE_START_FORMAT: 'DD',
  MAIN_EVENT_DATE_END_FORMAT: 'DD MMM',
  INPUT_DATE_FORMAT: 'DD/MM/YY HH:mm',
};

const HOURS = 24;
const MINUTES = 60;

const newEventInfo = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

const newEventCity = {
  id: '',
  description: '',
  name: '',
  pictures: [],
};

const Message = {
  FAILED: 'Failed to load latest route information',
  LOADING: 'Loading...'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filterEmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DEFAULT: 'day',
  TIME_DOWN: 'time-down',
  PRICE_DOWN: 'price-down',
};

const PRICE_PATTERN = '[0-9]*';

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {
  EVENTS_COUNT,
  EVENT_TYPES,
  DateFormat,
  HOURS,
  MINUTES,
  newEventInfo,
  newEventCity,
  Message,
  FilterType,
  filterEmptyMessage,
  Mode,
  SortType,
  PRICE_PATTERN,
  UserAction,
  UpdateType,
};
