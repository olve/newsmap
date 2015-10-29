//earth by night: https://mapsengine.google.com/10446176163891957399-03098191120537720121-4/mapview/?authuser=0
/*	this is my API key. I have to make it public here, so that the app can be fully client-side. Please don't use my API keys. Getting your own is free */
var NEWSWIRE_KEY = "4f7aba1fa8f0fb49cbb245aebc780340:0:73332851"; //newswire api-key

var styles = [
  {
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{ hue: '#0E1C4B' },
			{ saturation: 57 },
			{ lightness: -80 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'water',
		elementType: 'all',
		stylers: [
			{ hue: '#00011F' },
			{ saturation: 100 },
			{ lightness: -92 },
			{ visibility: 'on' }
		]
	},
];


var map;
function initMap() {

	var styledMap = new google.maps.StyledMapType(styles, {name: "newsmap"});
	var options = {
		zoom: 3,
		disableDefaultUI: true,
		/*draggable: false,
		zoomControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,*/
		center: {
			lat: 25,
			lng: 10,
			//lat: 44.84088, 
			//lng: 11.02440,
		},
		mapTypeControlOptions: {
			mapTypeIds: ["newsmap"],
		},
	};

	map = new google.maps.Map(document.getElementById('map'), options);
	map.mapTypes.set("map_style", styledMap);
	map.setMapTypeId("map_style");

	function newsWireCallback(response) {
		var geoJson_ = newswireResponseToGeoJson(response);
		var json_ = JSON.stringify(geoJson_);
		map.data.addGeoJson(JSON.parse(json_));
		map.data.addListener("click", function(event) {
			alert(event.feature.getProperty("title"));
		});
	}

	getNewswire(NEWSWIRE_KEY, "all", "world", newsWireCallback);

/*
	var srcImage = "static/img/nightlights.jpg";
	var img = {
		getTile: function(args) {
			console.log(args);
			return srcImage;
		},
		getTileUrl: function(coord, zoom) {
			console.log(coord, zoom);
			return srcImage;
		},
		tileSize: new google.maps.Size(12150, 6075),
	};

	map.overlayMapTypes.push(img);

*/
}