//Client Router

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