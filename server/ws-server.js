'use strict';

var WebSocketServer = require('ws').Server,

/**
 * A Websocket server implementation
 * The server is a singleton.
 * @param {Integer} port The port number on which the server start running
 */
Server = (function () {
    var SERVER_INSTANCE;

    function server(port, cb) {

        var self = this;

        if (!(this instanceof server)) {
            return new server(port, cb);
        }

        /**
         * Public variables
         * Exposing the websocket interface
         * https://www.npmjs.com/package/ws
         */
        this.server = new WebSocketServer({ port: port });

        /**
         * Broadcast
         * @param {String} data The data to be sent to all clients.
         */
        this.server.broadcast = function broadcast(data) {
            self.server.clients.forEach(function each(client) {
                client.send(data);
            });
        };

        /**
         * connection {Event} This runs when a new client connects to the server.
         */
        this.server.on('connection', function connection(ws) {
            self.ws = ws;

            self.ws.on('message', function incoming(message) {
                console.log('Server '+port+' received: "%s"', message);
            });

            self.ws.send('Server at '+port+' says: Hello');

            setInterval(function(){
                self.ws.send('Server at '+port+' says: Hello');
            }, 2000);

            cb(self);
        });
    }

    return function (port, cb) {
        try {
            if (!port) throw "Server port not specified";

            if (!SERVER_INSTANCE) {
                SERVER_INSTANCE = server.apply(null, [port, cb]);
                console.log("Started server on port "+port)
            }
            return SERVER_INSTANCE;
        } catch (e) {
            console.log(e);
        }
    }
})();

module.exports = Server;