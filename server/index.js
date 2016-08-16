'use strict';

/**
 * Web socket server and client.
 * Command line script to start up a websocket and client based on parameters passed.
 * For information run
 *  node index.js -h
 */

/**
 * Defining the command line arguments
*/

const cli = require(__dirname+"/cli-config.js");

var server = require(__dirname+"/ws-server.js"),
    client = require(__dirname+"/ws-client.js");

if (cli.help || (!cli['server-port'] && !cli['client-port'])) {
    console.log(getUsage(sections));
    process.exit(1);
}

// Start up a client
new client({port:cli['client-port']});

// Start up the server

server(cli['server-port'], function (app) {
    app.server.broadcast("Broadcast to all clients");
});
