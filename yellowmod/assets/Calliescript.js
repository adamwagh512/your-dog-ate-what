function initMap() {
    
    var options = {
        center: {lat: 30.2672 , lng: -97.7431 },
        zoom: 8
    }

    // Var: to store results of places search
    //  Google Maps - 30 Miles radius 

    map = new google.maps.Map(document.getElementById("map"), options)
}

// Set up function for searching maps for "vet", "veterinarian", "animal hospital" , "24 hours animal hospital"
// (Source:  https://developers.google.com/maps/documentation/javascript/places )
// Add Places API

// Create loop for search.

// Google Geolocation API Here

// Create function that allows these to talk to each other. 