import { sortByDate } from './sort';
import { getTotalEventPrice, getSelectedOffers, getFormattedEventDate, getCityById } from './event';
import { DateFormat } from '../const';

function getTripInfo(events, cities) {
  const sortedEvents = events.sort(sortByDate);

  const startDate = getFormattedEventDate(sortedEvents[0].dateFrom, DateFormat.MAIN_EVENT_DATE_START_FORMAT);
  const endDate = getFormattedEventDate(sortedEvents[sortedEvents.length - 1].dateTo, DateFormat.MAIN_EVENT_DATE_END_FORMAT);

  const citiesList = [];
  let citiesListString = '';

  sortedEvents.forEach((event) => {
    citiesList.push(getCityById(event.destination, cities).name);
  });

  if (sortedEvents.length <= 3) {
    citiesListString = citiesList.join('-');
  } else {
    citiesListString = `${citiesList[0]} ... ${citiesList[citiesList.length - 1]}`;
  }

  return {
    cities: citiesListString,
    dates: `${startDate} — ${endDate}`
  };
}

function getTripInfoCost(events, allOffers) {
  const prices = [];
  events.forEach((event) => {
    const { basePrice, type, offers: selectedOffersIds } = event;
    const selectedOffers = getSelectedOffers(type, [...selectedOffersIds], allOffers);
    const totalPrice = getTotalEventPrice(basePrice, selectedOffers);
    prices.push(totalPrice);
  });
  const totalTripPrice = prices.reduce((sum, price) => sum + price, 0);

  return totalTripPrice;
}

export { getTripInfo, getTripInfoCost };
