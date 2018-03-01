function startMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat:  19.397587,
      lng: -99.171640
    },
    zoom: 12,
    disableDefaultUI: true
  });
  
  var searchBox = new google.maps.places.SearchBox(document.getElementById('search'));
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    searchBox.set('map', null);

    var places = searchBox.getPlaces();

    var bounds = new google.maps.LatLngBounds();
    var i, place;
    for (i = 0; place = places[i]; i++) {
      (function(place) {
        var marker = new google.maps.Marker({

          position: place.geometry.location
        });
        marker.bindTo('map', searchBox, 'map');
        google.maps.event.addListener(marker, 'map_changed', function() {
          if (!this.getMap()) {
            this.unbindAll();
          }
        });
        bounds.extend(place.geometry.location);

      }(place));

    }
    map.fitBounds(bounds);
    searchBox.set('map', map);
    map.setZoom(Math.min(map.getZoom(),12));

  });
}

  startMap();