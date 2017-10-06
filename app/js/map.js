function initMap() {
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 40.7635121, lng: -73.9823369},
	  zoom: 3,
	  //disableDefaultUI: true,
	  //draggable: false,
	  styles: [
						  {
						    "elementType": "labels",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "administrative",
						    "elementType": "labels.text.fill",
						    "stylers": [
						      {
						        "color": "#444444"
						      }
						    ]
						  },
						  {
						    "featureType": "administrative.land_parcel",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "administrative.neighborhood",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "landscape",
						    "stylers": [
						      {
						        "color": "#f2f2f2"
						      }
						    ]
						  },
						  {
						    "featureType": "poi",
						    "elementType": "labels.text",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "poi.business",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "road",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "road",
						    "elementType": "labels.icon",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "transit",
						    "stylers": [
						      {
						        "visibility": "off"
						      }
						    ]
						  },
						  {
						    "featureType": "water",
						    "stylers": [
						      {
						        "color": "#46bcec"
						      },
						      {
						        "visibility": "on"
						      }
						    ]
						  }
						]
	});
}