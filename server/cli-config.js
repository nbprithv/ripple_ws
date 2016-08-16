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

module.exports = cli;