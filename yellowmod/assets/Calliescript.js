
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU

// // Set up function for searching maps for "vet", "veterinarian", "animal hospital" , "24 hours animal hospital"
// // (Source:  https://developers.google.com/maps/documentation/javascript/places )
// // Add Places API

const CLINIC_NUMBER = 3;

const BASE_TEXT_API_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const BASE_PLACE_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

function buildRequestUrl(baseUrl, queryParams) {
    if (Object.keys(queryParams).length < 1) {
        return baseUrl;
    }

    let finalUrl = baseUrl + '?';
    let paramsArray = Object.keys(queryParams);
    // Guaranteed to have at least one parameter due to the initial conditional
    // The first parameter doesn't lead with an &
    finalUrl = finalUrl + `${paramsArray[0]}=${queryParams[paramsArray[0]]}`;
    for (var i = 1; i < paramsArray.length; i++) {
        let key = paramsArray[i];
        finalUrl = finalUrl + `&${key}=${queryParams[key]}`;
    }

    return finalUrl;
}

function baseApiCall() {
    console.debug("Hey");
    let apiUrl = BASE_TEXT_API_URL;
    let params = {
        query: 'Animal hospital',
        key: 'AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU',
        openNow: true
    }
    let requestUrl = buildRequestUrl(apiUrl, params);
    
    fetch(requestUrl)
    .then(res => res.json())
    .then(data => myFunction(data.results))
}

function populateModal(data) {

}
function myFunction(clinics) {
    // for (var i = 0; i < CLINIC_NUMBER; i++) {
        let clinic = clinics[0];
        let id = clinic.place_id;
        let details = requestClinicDetails(id);
    // }
}

function requestClinicDetails(clinicId) {
    let apiUrl = BASE_PLACE_API_URL;
    let params = {
        place_id: clinicId,
        key: 'AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU',
        fields: 'formatted_phone_number',
    }
    let requestUrl = buildRequestUrl(apiUrl, params);
    
    fetch(requestUrl)
    .then(res => res.json())
    .then(data => {
        console.debug(data)
        return data;
    });
}

baseApiCall();
// Create loop for search.

// Google Geolocation API Here

// Create function that allows these to talk to each other. 

// https://maps.googleapis.com/maps/api/place/textsearch/json?query="vet "

// https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU