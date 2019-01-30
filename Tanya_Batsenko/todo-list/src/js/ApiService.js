export default class ApiService {
  static async getRequest(URL_TO_FETCH) {
    return (await fetch(URL_TO_FETCH)).json();
  }

  static async postRequest(URL_TO_FETCH, requestBody) {
    const response = await (await fetch(URL_TO_FETCH, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();
    return response;
  }

  static async deleteRequest(URL_TO_FETCH) {
    const response = await (await fetch(URL_TO_FETCH, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();
    return response;
  }

  static async patchRequest(URL_TO_FETCH, requestBody) {
    const response = await (await fetch(URL_TO_FETCH, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();
    return response;
  }
}
