let lives;
function generateRandomCoordinate() {
    // Your function to generate a random coordinate within bounds
    const latMin = 29.63643;
    const latMax = 29.65203;
    const lonMin = -82.37244;
    const lonMax = -82.33928;

    const latitude = Math.random() * (latMax - latMin) + latMin;
    const longitude = Math.random() * (lonMax - lonMin) + lonMin;

    return { lat: latitude, lng: longitude };
}

function initMap() {
    loadStreetView(0);
}

function initAutocomplete(actualLocation) {
    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(29.636428923997098, -82.37244377545372), // Bottom left
        new google.maps.LatLng(29.652028629946923, -82.33927696654501)  // Top right
    );

    const searchInput = document.getElementById('location-search');

    const options = {
        bounds: bounds,
        strictBounds: true,
        types: ['geocode'],
    };

    const autocomplete = new google.maps.places.Autocomplete(searchInput, options);

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        const guessLocation = place.geometry.location;
        const distance = google.maps.geometry.spherical.computeDistanceBetween(guessLocation, actualLocation);
        
        // Convert 50 feet to meters (1 foot = 0.3048 meters)
        if (distance <= 1000 * 0.3048) {
            console.log("Winner");
        } else {
            lives--;
            console.log("Try again. Lives remaining: " + lives);
            if (lives <= 0) {
                findClosestPlace(actualLocation);
            }
        }
    });
    
}


function checkStreetViewAvailability(location, callback) {
    const streetViewService = new google.maps.StreetViewService();
    const radius = 50; // Search within 50 meters of the given location
    streetViewService.getPanorama({location: location, radius: radius}, function(data, status) {
        if (status === google.maps.StreetViewStatus.OK) {
            // Street View is available
            callback(true, data.location.latLng);
        } else {
            // Street View is not available
            callback(false, null);
        }
    });
}

function loadStreetView(retryCount) {
    const maxRetries = 5;
    lives = 3;
    const randomCoordinate = generateRandomCoordinate();
    console.log('Trying coordinates:', randomCoordinate);

    checkStreetViewAvailability(randomCoordinate, function(isAvailable, newLocation) {
        if (isAvailable) {
            console.log('Street View available. Loading panorama...');
            const panorama = new google.maps.StreetViewPanorama(
                document.getElementById('street-view'), {
                    position: newLocation,
                    pov: {heading: 165, pitch: 0},
                    zoom: 1,
                    addressControl: false,
                });
            console.log('Panorama loaded at:', newLocation);

            // Convert newLocation to a google.maps.LatLng object if it's not already one.
            const actualLatLng = new google.maps.LatLng(newLocation.lat(), newLocation.lng());
            // Call initAutocomplete with the actual location where Street View was found.
            initAutocomplete(actualLatLng);
        } else {
            console.log('No Street View available at this location. Retrying...');
            if (retryCount < maxRetries) {
                loadStreetView(retryCount + 1);
            } else {
                console.log('Max retries reached. Unable to find a location with Street View.');
            }
        }
    });
}



function findClosestPlace(actualLocation) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch({
        location: actualLocation,
        radius: 50, // Search within a small radius
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
            const closestPlace = results[0];
            const distance = google.maps.geometry.spherical.computeDistanceBetween(actualLocation, closestPlace.geometry.location);
            console.log(`Closest place: ${closestPlace.name}, Distance: ${distance} meters`);
        } else {
            console.log("No places found within the radius.");
        }
    });
}
