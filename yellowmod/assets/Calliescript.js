
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

// Rename myFunction at some point
function myFunction(clinics) {
    for (var i = 0; i < CLINIC_NUMBER; i++) {
        let clinic = clinics[i];
        console.debug(clinic);
        let id = clinic.place_id;
        requestClinicDetails(id)
        .then(detail => {
            let phoneNumber = console.debug(detail);
            let clinicObject = {
                address: clinic.formatted_address,
                name: clinic.name,
                phoneNumber: phoneNumber
            };

            // Get i-th clinic box element and pass it into here
            populateClinicBox(clinicBoxElement, clinicObject);
        });
    }
}

// Take in a clinic box html element and fill it with details from the clinic object
// Append to page if not already
function populateClinicBox(clinicBoxElement, clinicObject) {

}

function requestClinicDetails(clinicId) {
    let apiUrl = BASE_PLACE_API_URL;
    let params = {
        place_id: clinicId,
        key: 'AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU',
        fields: 'formatted_phone_number',
    }
    let requestUrl = buildRequestUrl(apiUrl, params);
    
    return fetch(requestUrl)
    .then(res => res.json())
    .then(data => {
        return data.result.formatted_phone_number;
    });
}

baseApiCall();
// Create loop for search.

// Google Geolocation API Here

// Create function that allows these to talk to each other. 

// https://maps.googleapis.com/maps/api/place/textsearch/json?query="vet "

// https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU