import error from '../index';
const URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountry(countryId) {
    return fetch(`${URL}/${countryId}`)
        .then(response => response.status >= 404 ? error(response) :  response.json());
}

export default { fetchCountry };