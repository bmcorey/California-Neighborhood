//APP CORE

//Locations
var initialLocation = [
  {
    title: 'Another Elementary School',
    location: { lat: 37.3431, lng: -122.0022 },
  },
  {
    title: 'The Medical Center',
    location: { lat: 37.336, lng: -121.9979 },
  },
  {
    title: 'The best SuperMarket',
    location: { lat: 37.3540, lng: -121.9980 },
  },
  {
    title: 'My Middle School',
    location: { lat: 37.3497, lng: -122.0072 },
  },
  {
    title: 'My Elementary School',
    location: { lat: 37.3480, lng: -121.9870 },
  },
  {
    title: 'The Farm',
    location: { lat: 37.3459, lng: -122.0061 },
  },
  {
    title: 'My High School',
    location: { lat: 37.3455, lng: -121.9819 },
  },
  {
    title: 'The Golf Club',
    location: { lat: 37.3319, lng: -121.9631 },
  },
  {
    title: 'California\'s Great America',
    location: { lat: 37.3979, lng: -121.9743 },
  },
  {
    title: 'The Park',
    location: { lat: 37.3329, lng: -122.0870 },
  }
];

var locationInformation = function (data) {
  this.title = (data.title);
  this.location = (data.location);
  this.marker = (data.marker);
  this.visible = ko.observable(true);

  this.showMarker = ko.computed(function () {
    if (this.visible() === true) {
      if (this.marker) {
        this.marker.setVisible(true);
      }
    } else {
      this.marker.setVisible(false);
    }
    return true;
  }, this);

};

var infowindow;

var map;

// Create a new blank array for all the listing markers.
var markers = [];

var displayModel = function () {
  var self = this;
  this.searchTitle = ko.observable('');

  this.locationList = ko.observableArray([]);

  initialLocation.forEach(function (locationItem) {
    self.locationList.push(new locationInformation(locationItem));
  });

  this.changeLocation = function (clickLocation) {
    popInfoWindow(clickLocation.marker, infowindow);
  };

  // Creates the search function to return matching list items and markers.
  this.List = ko.computed(function () {
    var filter = self.searchTitle().toLowerCase();
    if (!filter) {
      self.locationList().forEach(function (locationItem) {
        locationItem.visible(true);
      });
      return self.locationList();
    }
    else {
      return ko.utils.arrayFilter(self.locationList(), function (locationItem) {
        var string = locationItem.title.toLowerCase();
        var result = (string.search(filter) >= 0);
        locationItem.visible(result);
        return result;
      });
    }
  }, self);
};

// Start Knockout View Model
var vm = new displayModel();
ko.applyBindings(vm);

//Error handling
function errorHandling () {
	alert("Google Maps has failed to load. Please check your internet connection and try again.");
}
