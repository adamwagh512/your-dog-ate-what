
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU

// // Set up function for searching maps for "vet", "veterinarian", "animal hospital" , "24 hours animal hospital"
// // (Source:  https://developers.google.com/maps/documentation/javascript/places )
// // Add Places API

const CLINIC_NUMBER = 3;

const BASE_TEXT_API_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const BASE_PLACE_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

const CLINIC_INFO_CONTAINER_ID = 'clinic-info-container'

const MAP_HTML_ID = 'clinicsMap';
const MAPS_QUERY = 'animal hospital';

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
        query: MAPS_QUERY,
        key: 'AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU',
        openNow: true
    }
    let requestUrl = buildRequestUrl(apiUrl, params);
    let headers = new Headers({
        'Access-Control-Allow-Origin': '*'
    })
    fetch(requestUrl, {
        mode: 'cors'
    })
    .then(res => res.json())
    .then(data => buildClinicInfoSection(data.results))
}

function populateModal(data) {

}

// Rename myFunction at some point
function buildClinicInfoSection(clinics) {

    let infoContainer = $('#'+CLINIC_INFO_CONTAINER_ID);
    for (var i = 0; i < CLINIC_NUMBER; i++) {
        let clinic = clinics[i];
        console.debug(clinic);
        let id = clinic.place_id;
        requestClinicDetails(id)
        .then(detail => {
            let phoneNumber = detail;
            let clinicObject = {
                address: clinic.formatted_address,
                name: clinic.name,
                phoneNumber: phoneNumber
            };
            let clinicBoxElement = createClinicBoxElement().addClass('box has-text-centered');
            // Get i-th clinic box element and pass it into here
            populateClinicBoxElement(clinicBoxElement, clinicObject);
            console.debug(clinicBoxElement);

            infoContainer.append(clinicBoxElement);
        });
    }
}

// Take in a clinic box html element and fill it with details from the clinic object
// Append to page if not already
function populateClinicBoxElement(clinicBoxElement, clinicObject) {
    $(clinicBoxElement.children('p')[0]).text(`Clinic Name: ${clinicObject.name}`);
    $(clinicBoxElement.children('p')[1]).text(`Address: ${clinicObject.address}`);
    $(clinicBoxElement.children('p')[2]).text(`Phone Number: ${clinicObject.phoneNumber}`);
}

function createClinicBoxElement() {
    let clinicInfoBox = $('<div>');
    clinicInfoBox.append($('<p>'), $('<p>'), $('<p>'));

    return clinicInfoBox;
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
// googleMapsTests();

// function googleMapsTests() {
//     let austin = new google.maps.LatLng(30.2672, -97.7431);

//     let infoWindow = new google.maps.InfoWindow();

//     let map = new google.maps.Map($('#'+MAP_HTML_ID), {center: austin, zoom: 15});

//     let request = {
//         query: MAPS_QUERY,
//         fields: ['name', 'formatted_address'],
//     };

//     let service = new google.maps.places.PlacesService(map);

//     service.findPlaceFromQuery(request, function(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//                 createMarker(results[i]);
//             }
//             map.setCenter(results[0]);
//         }
//     })
// }

// function createMarker(place) {
//     if (!place.geometry || !place.geometry.location) return;

//     const marker = new google.maps.Marker({
//         map,
//         position: place.geometry.location,
//     });

//     google.maps.event.addListener(marker, "click", () => {
//         infowindow.setContent(place.name || "");
//         infowindow.open(map);
//     });
// }

// Create loop for search.

// Google Geolocation API Here

// Create function that allows these to talk to each other. 

// https://maps.googleapis.com/maps/api/place/textsearch/json?query="vet "

// https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU