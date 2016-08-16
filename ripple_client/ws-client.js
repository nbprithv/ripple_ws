/*
* Basic Web Socket client
* Connect to Ripple service and subscribe to 'ledger' stream
*/
'use strict';

var config = require(__dirname+'/config.js'),
    WebSocket = require('ws'),
	ws = new WebSocket(config.host),
	clientRouter = require(__dirname+'/client-router.js');

/*
* Open connection
* Subscribe to 'ledger' streams
*/
ws.on('open', function open() {
	console.log("Connected to "+config.host);
	ws.send('{"id":4,"command":"subscribe","accounts":[],"streams":["ledger"]}');
});


/*
* On receiving a message, parse the JSON response.
* If the JSON is malformed, error out gracefully.
* If JSON is good, check if the JSON has a 'type' parameter.
* 	The 'type' will be handled appropriately by the client router.
*/
ws.on('message', function(data, flags) {
	try {
		var data = JSON.parse(data);
		if (data.type) {
			clientRouter(data);
		}
	} catch (e) {
		console.log("JSON is malformed");
	}
});
