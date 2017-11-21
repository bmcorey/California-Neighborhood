//Google maps API use

function initMap() {
  // Initialize Google map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.3541, lng: -121.9552 },
    zoom: 13
  });

  // Start infowindow
  infowindow = new google.maps.InfoWindow();

  // Create an array of markers on initialize.
  for (var i = 0; i < initialLocation.length; i++) {

    // Get the position from the location array.
    var position = initialLocation[i].location;
    var title = initialLocation[i].title;

    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Add marker as a property of each Location.
    vm.locationList()[i].marker = marker;

    // Push the marker to our array of markers.
    markers.push(marker);

    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', clickMarker);
  }

  function clickMarker() {
    popInfoWindow(this, infowindow);
  }
}