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
      body: JSON.stringify(event),
      headers: new Headers(contentTypeHeader),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${Route.POINTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers(contentTypeHeader),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(eventId) {
    const response = await this._load({
      url: `${Route.POINTS}/${eventId}`,
      method: Method.DELETE,
    });

    return response;
  }
}
