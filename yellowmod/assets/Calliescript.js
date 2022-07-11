
https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU

// Set up function for searching maps for "vet", "veterinarian", "animal hospital" , "24 hours animal hospital"
// (Source:  https://developers.google.com/maps/documentation/javascript/places )
// Add Places API

fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU&openNow=true')
.then(res => res.json())
.then(data => console.log(data))

// Create loop for search.

// Google Geolocation API Here

// Create function that allows these to talk to each other. 

https://maps.googleapis.com/maps/api/place/textsearch/json?query="vet "

https://maps.googleapis.com/maps/api/place/textsearch/json?query=Animalhospital&key=AIzaSyCeAPHf2DiPsUeBJ0-2c6UvdH78gma_TJU