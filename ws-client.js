'use strict';

var WebSocket = require('ws'),
	ws = new WebSocket('wss://s1.ripple.com'),
	clientRouter = require('./client-router.js');


ws.on('open', function open() {
  ws.send('{"id":4,"command":"subscribe","accounts":[],"streams":["ledger"]}');
  //ws.send('{"id": 2,"command": "ledger_closed"}');
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