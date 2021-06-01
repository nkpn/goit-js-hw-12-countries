import './sass/main.scss';
import getRefs from './js/get-refs';
import API from './js/API'
import CountriesCardTamplate from './templates/country-card.hbs';
import listTemplate from './templates/list-tmpl.hbs';
const _debounce = require('lodash.debounce');
//* Pnotify
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import { alert, defaults, defaultStack } from '@pnotify/core';
defaults.maxTextHeight = null; //* убрал колесо прокрутки у pnotify alert

const refs = getRefs();

refs.searchForm.addEventListener('change', _debounce(searchFn, 500));

function searchFn(e) {
    e.preventDefault();

    const form = e.currentTarget;
    // const searchQuery = form.e.query.value; //* вот тут что-то
    const searchQuery = e.target.value.trim();
    
    if (searchQuery.length < 1) {
        return emptyInput();
    }

    return API.fetchCountry(searchQuery)
        .then(data => data.length <= 10 && data.length >= 2
            ? renderList(data)
            : data.length < 2
                ? renderCountryCard(data)
                : onFetchError(data)
        )
        .catch(onFetchError)
        .finally(()=> form.reset())
}

function renderCountryCard(country) {
    const markup = CountriesCardTamplate(country);
    refs.cardContainer.innerHTML = markup;
}

function renderList(country) {
    const markList = listTemplate(country);
    refs.cardContainer.innerHTML = markList;
}

function onFetchError() {
    clearDOM();
    alert({
    title: 'C`mon! Not this again!',
    text: 'Too many matches found. Please enter a more specific query ;)',
    delay: 2000,
    });
}

function emptyInput() {
    clearDOM();
    alert({
        text: 'It`s not easy but please enter something',
        delay: 2000,
    })
}

function clearDOM() {
    refs.cardContainer.innerHTML ='';
}


