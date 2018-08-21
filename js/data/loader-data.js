import {adapterData} from './adapter-data';

const URL = `https://es.dump.academy/guess-melody`;
const MY_API_ID = 338829;

const convertJSON = (response) => response.json();

const checkStatusResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 404) {
    return [];
  }
  throw new Error(`${response.status}, ${response.statusText}`);
};

export default class LoaderApi {
  static loadQuestions() {
    return fetch(`${URL}/questions`).then(checkStatusResponse).then(convertJSON).then(adapterData);
  }

  static loadResults() {
    return fetch(`${URL}/stats/${MY_API_ID}`).then(checkStatusResponse).then((response) => (response.length !== 0) ? convertJSON(response) : response);
  }

  static saveResults(data) {
    data = Object.assign({}, data);
    const reuqestOptions = {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify(data)
    };

    return fetch(`${URL}/stats/${MY_API_ID}`, reuqestOptions).then(checkStatusResponse);
  }
}
