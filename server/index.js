'use strict';

// Web socket server and client.
// node ws-server.js --port 5000

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const options = [
    {name: 'server-port', alias: 's', type: Number, description: 'Start a web socket server listening on this port'},
    {name: 'client-host', alias: 'k', type: String, defaultOption:'localhost', description: 'Start a web socket client listening to this host. Defaults to localhost'},
    {name: 'client-port', alias: 'c', type: Number, description: 'Start a web socket client listening to this port'},
    {name: 'help', alias: 'h', type: Boolean, description: 'Print this help menu'}
];

const sections = [
  {
    header: 'Web socket server and client',
    content: 'Start up a simple web socket server or client from the command line'
  },
  {
    header: 'Options',
    optionList: options
  }
];

const cli = commandLineArgs(options);

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
    app.ws.send("From the index");
    app.server.broadcast("Broadcast to all clients");
});
