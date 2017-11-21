//FourSquare API use

// Pop the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and pop based
// on that markers position.
function popInfoWindow(marker, infowindow) {

  // Check infowindow open
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('');
    infowindow.addListener('closeclick', function () {
      infowindow.setMarker = null;
    });

    // Foursquare API use
    var foursquareUrl = "https://api.foursquare.com/v2/venues/search?query=" +
      marker.title + '&ll=' + marker.position.lat() + ',' + marker.position.lng() +
      '&client_id=WZBPPUK0LEKJUVBPOK33MHS5EZZNNYNJ0XYLKYEA1BE5JPT3' +
      '&client_secret=IIFBYWMNBO0KIZ0XJKO5BIWQ1BHFGJZZQKGEL4E1ZUUY4T5F&v=20170711';

    //AJAX call&promise
    $.ajax({
      url: foursquareUrl,
      dataType: "json",
      success: function (data) {
        var fourSq = data.response.venues[0];
        infowindow.setContent('<div><h3>' + fourSq.name + '</h3>' +
          fourSq.location.address + '</div><div>' +
          fourSq.location.city + '</div>');
      },
      error: function () {
        alert("There was an error.Failed to get Foursquare resources Try again please!");
      }
    });


    // Open the infowindow on the correct marker
    infowindow.open(map, marker);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      marker.setAnimation(null);
    }, 2100);
  }
}