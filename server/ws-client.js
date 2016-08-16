'use strict';

var WebSocket = require('ws'),
    reconnectInterval = 1000,
    Client;

/**
 * A Websocket client implementation
 * @param Object {
        host: <host_name>, Host name of the server. Defaults to localhost
        port: <port_number> Port at which the server is running
    }
 * @constructor
 */
Client = function (obj) {


    // Adding this so that you dont need 'new' when you require this module
    if (!(this instanceof Client)) {
        return new Client(obj);
    }

    try {
        if (!obj.port) throw "Client port not specified";

        obj.host = obj.host ? obj.host : 'localhost';


        /**
         * Private variables
         */
        this._protocol = obj.secure ? 'wss://' : 'ws://';
        this._host = this._protocol+obj.host+':'+obj.port;
        this._port = obj.port;

        this.connect();

    } catch (e) {
        console.log(e);
    }
};

Client.prototype = {

    /**
     * Connect to the server and set up basic websocket client handlers
     * @Function connect
     * @param {String} host
     * @param {Function} cb Call back function once the connection is successful
     * @return {Void}
     */
    connect: function(cb){

        this.ws = new WebSocket(this._host);
        var self = this;

        
        this.ws.on('open', function() {
            console.log('Connected to '+self._host);
            self.ws.send('Hello from client');
        });

        /**
         * Log errors in connection
         * @Event error
         */
        this.ws.on('error', function() {
            console.log("Couldn't connect to "+self._host);
        });

        /*
        * If the client loses connection with server, a back off algorithm will try reconnecting
        * @Event close
        */
        this.ws.on('close', function() {

            reconnectInterval = reconnectInterval * 2;
            console.log('Trying to reconnect in '+reconnectInterval/1000+' seconds');

            setTimeout(function() {self.connect(self._host)}, reconnectInterval);
        });

        /**
         * When a client gets a message, print it
         * @Event message
         */
        this.ws.on('message', function(data, flags) {
            console.log("Client received: \"%s\"", data);
        });
    }
};

module.exports = Client;