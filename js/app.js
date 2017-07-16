/*"Neighborhood Map" - Shows a searchable list of Restaurants locations in San Francisco, CA.*/


var initialRestaurants = 
     [
         {
            
            name : 'Cliff_House',
			latlngLoc: {lat: 37.778476, lng: -122.513963},
			lat: 37.778476,
			lng: -122.513963,
			markerLoc: true,
			URL: "https://cliffhouse.com/ ",
			wikiSnippet: '',
			Street: "1090 Point Lobos Ave",
			City: "San Francisco, CA 94121",
			streetViewUrl: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=",
			streetViewImage: function() {
			 return this.streetViewUrl + this.Street + ',' + this.City + '';
			}

        },
        {
            
            name : 'Olive_Garden',
            latlngLoc: {lat: 37.727253, lng: -122.476354},
			lat: 37.727253,
			lng: -122.476354,
			markerLoc: true,
			URL: "http://www.olivegarden.com",
			wikiSnippet: '',
			Street: "3251 20th AveSan Francisco",
			City: "San Francisco, CA 94132",
			streetViewUrl: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=",
			streetViewImage: function() {
			 return this.streetViewUrl + this.Street + ',' + this.City + '';
			}
		
	
        },
        {
            
            name : 'Cafe_Flore',
            latlngLoc: {lat: 37.764656, lng: -122.432936},
			lat: 37.764656,
			lng: -122.432936,
			markerLoc: true,
			URL: "http://flore415.com/",
			wikiSnippet: '',
			Street: "2298 Market Street",
			City: "San Francisco, CA 94114",
			streetViewUrl: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=",
			streetViewImage: function() {
			 return this.streetViewUrl + this.Street + ',' + this.City + '';
			}
	
			
        },
        {
            
            name : 'Rainforest_Cafe',
            latlngLoc: {lat: 37.808057, lng: -122.414706},
			lat: 37.808057,
			lng: -122.414706,
			markerLoc: true,
			URL: "http://www.rainforestcafe.com/locations.asp?st=ca",
			wikiSnippet: '',
			Street: "145 Jefferson St.",
			City: "San Francisco, CA 94133",
			streetViewUrl: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=",
			streetViewImage: function() {
			 return this.streetViewUrl + this.Street + ',' + this.City + '';
			}
		
		
        },
        {
            
            name : 'Quince_(restaurant)',
            latlngLoc: {lat: 37.797586, lng: -122.403393},
			lat: 37.797586,
			lng: -122.403393,
			markerLoc: true,
			URL: "http://quincerestaurant.com/",
			wikiSnippet: '',
			Street: "470 Pacific Ave",
			City: "San Francisco, CA 94133",
			streetViewUrl: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=",
			streetViewImage: function() {
			 return this.streetViewUrl + this.Street + ',' + this.City + '';
			}
		
		
        },
		{
            
            name : 'Tadich_Grill',
            latlngLoc: {lat: 37.79342, lng: -122.399466},
			lat: 37.79342,
			lng: -122.399466,
			markerLoc: true,
			URL: "http://www.tadichgrill.com",
			wikiSnippet: '',
			Street: "240 California Street",
			City: "San Francisco, CA 94111",
			streetViewUrl: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=",
			streetViewImage: function() {
			 return this.streetViewUrl + this.Street + ',' + this.City + '';
			}
		
		
        }
    ];
// global variables
var map, marker;
/* Constructor Restaurant to create a new object for each location in the observable array */
var Restaurant = function(data) {
	var self = this;
	self.name = data.name;
	self.lat = data.lat;
	self.lng = data.lng;
	self.latlngLoc = data.latlngLoc;
	self.markerLoc = data.markerLoc;
	self.URL = data.URL;
	self.street = data.street;
	self.city = data.city;
	self.wikiSnippet = data.wikiSnippet;
	self.distance = ko.observable(data.distance);
	self.streetViewImage = data.streetViewImage();
	this.visible = ko.observable(true);
	// created resContent for data
	this.resContent = '<img src="' + self.streetViewImage + 
                                    '" alt="Street View Image of ' + self.name + '"><br><hr style="margin-bottom: 10px"><strong>' + 
                                    self.name + '</strong><br><p>' + 
                                    self.streetAddress + '<br>' + 
                                    self.cityAddress + '<br>' +
									self.wikiSnippet +'<br></p><a class="web-links" href="http://' + self.url + 
                                    '" target="_blank">' + self.url + '</a>';
    // Created a new infoWindow and passed the content string.
	this.infoWindow = new google.maps.InfoWindow({content: self.resContent});
	// Created a new marker object.
	this.marker = new google.maps.Marker({
	    position: new google.maps.LatLng(data.lat, data.lng),
	    map: map,
		title: data.name,
        streetAddress: data.Street,
		cityAddress: data.City,
		url: data.URL,
		wikiSnippet: data.wikiSnippet,
		streetViewImage: data.streetViewImage(),
        draggable: true,
        visible: true
 	});
	
	this.showMarker = ko.computed(function() {
	    if(this.visible() === true) {
		    this.marker.setMap(map);
		} else {
			this.marker.setMap(null);
		}
		return true;
	}, this);   
	
	
// If a marker is clicked, add a Restaurant content  to the marker.
this.marker.addListener('click', function(){
    self.resContent = '<img src="' + this.streetViewImage + 
                         '" alt="Street View Image of ' + self.name + '"><br><hr style="margin-bottom: 10px"><big><strong>' + 
                          self.name + '</big></strong><br><p><big>' +
                          this.streetAddress + '</big><br><big>' + 
                          this.cityAddress + '</big><br>' +
						  self.wikiSnippet +'<br></p><a class="web-links" href="http://' + this.url + 
                          '" target="_blank">' + this.url + '</a>';
	//Set the content to infowindow.
    self.infoWindow.setContent(self.resContent);
    // Open the infowindow on the correct marker.
	self.infoWindow.open(map, this);
    // Make sure the marker property is cleared if the infowindow is closed.
    self.infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
      });
		
	var winWidth = $(window).width();
        if(winWidth <= 970) {
            map.setZoom(7);
           } else if(winWidth > 970) {
                map.setZoom(11);  
           }
        // set bounce animation for the marker and call a timeout function
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
      	    self.marker.setAnimation(null);
     	}, 2100);
	});	//end of marker.addListener function
	

// Make the restaurants list clickable by using data-bind
this.setMarker = function(info) {
	google.maps.event.trigger(self.marker, 'click');
	map.setCenter(self.marker.position);
}; //end of setMarker function

	
var wikiUrl;

// If the wikiRequest times out, then display a message with a link to the Wikipedia page.
var wikiRequestTimeout = setTimeout(function() {
    var msg = 'Could not get Wikipedia resourses: <a href="';
	var link = 'https://en.wikipedia.org/wiki/';
    data.wikiSnippet=(msg + link + data.name + '" target="_blank">' + data.name + '</a>');
	}, 2000);
    wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + data.name + '&srproperties=snippet&format=json&callback=wikiCallback';
    $.ajax({url: wikiUrl,
	    dataType:'jsonp',
		success: function(data) {
		//Iterate through the data, to get the Wikipedia information.	
		var tmpRestaurant = "";
        for (var i=0; i< data[1].length; i++) {
            tmpRestaurant += data[2][i];
           }
            self.wikiSnippet = ('<br>' + tmpRestaurant + '<br>');
		}// end of success

	});// end of ajax
};



var ViewModel = function() {
    var self = this;
	this.names = ko.observableArray([]);
    this.markers = ko.observableArray([]);
    this.restaurantList = ko.observableArray([]);
	this.query = ko.observable('');
	
	initialRestaurants.forEach(function(resLoc) {
		self.restaurantList.push(new Restaurant(resLoc));
	});
	

    //This is data-binded to the Search box.
	// Searches the list of restaurants name for matches.
	self.filteredResList = ko.computed(function () {
    return ko.utils.arrayFilter(self.restaurantList(), function (resLoc) {
        if ( self.query().length === 0 || resLoc.name.toLowerCase().indexOf(self.query().toLowerCase()) > -1) {
            resLoc.marker.setVisible(true);
            return true; 
        } else {
                resLoc.marker.setVisible(false);
                return false;
                }
            });
        }); 
}; // end of ViewModel
// styles for the map
var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },
	{
        featureType: 'water',
        stylers: [
            { color: '#19a0d8' }
         ]
    },
	{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
     }
  ];
// Initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 37.792424 , lng: -122.410609},
    styles: styles

  });
 

ko.applyBindings(new ViewModel());
 } //end of initMap
 