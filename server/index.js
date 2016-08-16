'use strict';

/**
 * Web socket server and client.
 * Command line script to start up a websocket and client based on parameters passed.
 * For information run
 *  node index.js -h
 */

const cli = require(__dirname+"/cli-config.js");

var server = require(__dirname+"/ws-server.js"),
    client = require(__dirname+"/ws-client.js"),
    PORT_LISTEN = cli.args['PORT_LISTEN'],
    PORT_CONNECT = cli.args['PORT_CONNECT'];

if (cli.args['help'] || (!PORT_LISTEN && !PORT_CONNECT)) {
    console.log(cli.help(cli.content));
    process.exit(1);
}

// Start up a client
client({port: PORT_CONNECT, host: cli.args['HOST'], secure: cli.args['SECURE']});

// Start up the server
server(PORT_LISTEN, function (app) {
    // This call back is called when a client connects to this server
    app.server.broadcast("Broadcast to all clients");
});
