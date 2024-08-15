import ApiService from '../framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const Route = {
  POINTS: 'points',
  CITIES: 'destinations',
  OFFERS: 'offers'
};

const contentTypeHeader = { 'Content-Type': 'application/json' };

export default class EventsApiService extends ApiService {

  get events() {
    return this._load({ url: Route.POINTS })
      .then(ApiService.parseResponse);
  }

  get cities() {
    return this._load({ url: Route.CITIES })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: Route.OFFERS })
      .then(ApiService.parseResponse);
  }

  async addEvent(event) {
    const response = await this._load({
      url: Route.POINTS,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers(contentTypeHeader),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${Route.POINTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers(contentTypeHeader),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `${Route.POINTS}/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(event) {
    const adaptedEvent = {...event,
      'base_price': event.basePrice,
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      'is_favorite': event.isFavorite,
    };

    // Ненужные ключи мы удаляем
    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
