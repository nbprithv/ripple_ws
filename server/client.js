'use strict';

var WebSocket = require('ws'),
	ws = new WebSocket('ws://localhost:3000');


ws.on('open', function open() {
	console.log("Connected to Localhost");
	ws.send('message');
});

ws.on('message', function(data, flags) {
	console.log(data);
});