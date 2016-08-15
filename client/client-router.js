/*
* Client Router
* Receive the object from the Ripple stream.
* This router has a handler depending on the 'type' of object received.
*/

'use strict';

var clientRouter = function (data) {
	switch (data.type) {
		case 'ledgerClosed':
			ledgerClosed(data);
			break;
		default:
			break;
	}	
},

ledgerClosed = function (data) {
	console.log(data);
}

module.exports = clientRouter;