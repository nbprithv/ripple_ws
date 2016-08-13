'use strict';

var WebSocket = require('ws'),
	ws = new WebSocket('wss://s1.ripple.com'),
	server_info = {"id": 1,"command": "server_info"},
	subscribe_req = {"id":4,"command":"subscribe","accounts":[],"streams":["server","ledger"]};


ws.on('open', function open() {
  ws.send('{"id":4,"command":"subscribe","accounts":[],"streams":["server","ledger"]}');
});

ws.on('message', function(data, flags) {
  console.log(data);
});