Sails-SRESTClient
===

A Sails.js WebSocket Client - Request and listen to your RESTful APIs



<img src="http://haus11.org/sails_srest.PNG" width="600" align="center"/>



<img src="http://haus11.org/sails_srest2.PNG" width="600" align="center"/>


## Development

### Getting started

The first thing to do is to clone this repository and run
	
	npm install

After that make sure to install all bower components

	bower install

To start the the node.js server go into the root directory and run 

	grunt serve

The server will watches any file changes, injects bower components, automatically lints your scripts and restarts the server.

For building the chrome application you have to run

	grunt build

Import the newly updated/created dist folder to chrome for plugin creation.
