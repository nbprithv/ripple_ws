'use strict';

var WebSocket = require('ws'),
	ws = new WebSocket('wss://s1.ripple.com'),
	clientRouter = require(__dirname+'/client-router.js');


ws.on('open', function open() {
	console.log("Connected to Ripple");
	ws.send('{"id":4,"command":"subscribe","accounts":[],"streams":["ledger"]}');
});

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