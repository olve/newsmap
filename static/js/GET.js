function GET(url) {
	/*	perform a cross-domain GET request.
	---------------------------------------
		example usage:

		GET(url).then(function(response) {
			console.log(response);
		}).catch(function(error) {
			console.error(error)
		});
	*/
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = function() {
			if (xhr.status = 200) {
				resolve(xhr.response);
			}
			else {
				reject(Error(xhr.statusText));
			}
		};
		xhr.onerror = function() {
			reject(Error("Network error"));
		};
		xhr.send();
	});
}
