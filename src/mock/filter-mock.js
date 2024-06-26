import {filter} from '../utils/filter.js';

function generateFilters(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    }),
  );
}

export { generateFilters };
