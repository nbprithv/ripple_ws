'use strict';
/**
 * Defining the command line arguments
*/
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const options = [
    {name: 'PORT_LISTEN', alias: 's', type: Number, description: 'Start a web socket server listening on this port'},
    {name: 'PORT_CONNECT', alias: 'c', type: Number, description: 'Start a web socket client connecting to this port'},
    {name: 'HOST', alias: 'k', type: String, defaultOption:'localhost', description: 'Start a web socket client listening to this host. Defaults to localhost'},
    {name: 'SECURE', alias: 'x', type: Boolean, defaultOption:'false', description: 'Specify if the server to connect to is secure. Default is insecure.'},
    {name: 'help', alias: 'h', type: Boolean, description: 'Print this help menu'}
];

const content = [
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

module.exports = {
  args: cli,
  help: getUsage,
  content: content
};