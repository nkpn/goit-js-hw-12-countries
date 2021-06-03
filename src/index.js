import './sass/main.scss';
import getRefs from './js/get-refs';
import API from './js/API'
import CountriesCardTamplate from './templates/country-card.hbs';
import listTemplate from './templates/list-tmpl.hbs';
const _debounce = require('lodash.debounce');
//* Pnotify
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error, success, defaults, defaultStack } from '@pnotify/core';
defaults.maxTextHeight = null; //* убрал колесо прокрутки у pnotify alert

const refs = getRefs();

refs.searchForm.addEventListener('input', _debounce(searchFn, 500));

function searchFn(e) {
    e.preventDefault();

    const form = e.currentTarget;
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
        //.finally(()=> refs.searchForm.reset())
}

function renderCountryCard(country) {
    const markup = CountriesCardTamplate(country);
    refs.cardContainer.innerHTML = markup;
    success({
        title: 'is this what you were looking for?',
        delay: 3000,
    })
}

function renderList(country) {
    const markList = listTemplate(country);
    refs.cardContainer.innerHTML = markList;
    success({
        title: 'Nice list!',
        delay: 2000,
    })
}

function onFetchError() {
    clearDOM();
    error({
    title: 'Ooops! Something wrong',
    text: 'Please try again',
    delay: 2000,
    });
}

function emptyInput() {
    clearDOM();
    alert({
        text: 'Please enter some text',
        delay: 2000,
    })
}

function clearDOM() {
    refs.cardContainer.innerHTML ='';
}


