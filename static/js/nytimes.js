//http://api.nytimes.com/svc/news/v3/content/all/all?api-key=4f7aba1fa8f0fb49cbb245aebc780340:0:73332851
//http://api.nytimes.com/svc/news/{version}/content/{source}/{section}[/time-period][.response-format]?api-key={your-API-key}
//section = "all"; //options at: "http://api.nytimes.com/svc/news/v3/content/section-list.json?api-key="+api_key
//source = "all"; //all | nyt (new york times) | iht (international herald tribune)

//var NEWSWIRE_KEY = "4f7aba1fa8f0fb49cbb245aebc780340:0:73332851"; //newswire api-key

function getNewswire(api_key, source, section, callback) {
	//api_key https://myaccount.nytimes.com/register
	//source "all" | "nyt" (new york times) | "iht" (international herald tribune)
	//section "all" | options at: "http://api.nytimes.com/svc/news/v3/content/section-list.json?api-key="+api_key
	//callback function(resp) {console.log(resp);}
	var url = "http://api.nytimes.com/svc/news/v3/content/"+source+"/"+section+".json?api-key="+api_key;
	var output = null;
	GET(url).then(function(response) {
		callback(response);
	}).catch(function(error) {
		console.error(error)
	});
};


function newswireResponseToGeoJson(response) {
	var data = JSON.parse(response);
	var features = [];
	data.results.forEach(function(result) {
		if (result.hasOwnProperty("geo_facet")) {
			var country = result.geo_facet[0];

			if (country) {

				//sometimes the country is denoted as such: "Baghdad (Iraq)"
				var space = country.indexOf(" (");
				if (space > -1) {
					country = country.substring(space+2, country.length-1);
				}

				if (country && COUNTRY_CAPITAL_COORDINATES.hasOwnProperty(country)) {
					var capital =  COUNTRY_CAPITAL_COORDINATES[country];

					var geoJsonObject = {
						type: "Feature",
						properties: result,
						geometry: {
							type: "Point",
							coordinates: [parseFloat(capital.CapitalLongitude), parseFloat(capital.CapitalLatitude)],
						}
					};
					features.push(geoJsonObject);
				}
			}
		}
	});

	var output = {
		type: "FeatureCollection",
		features: features,
	};

	return output;
}

//getNewswire(NEWSWIRE_KEY, "all", "world", newswireResponseToGeoJson);