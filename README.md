Sails Live
===

A Sails.js WebSocket Client which supports you in testing your APIs.

###What Is Sails.js?

	"Sails makes it easy to build custom, enterprise-grade Node.js apps. 
	It is designed to emulate the familiar MVC pattern of frameworks like 
	Ruby on Rails, but with support for the requirements of modern apps: 
	data-driven APIs with a scalable, service-oriented architecture. 
	It's especially good for building chat, realtime dashboards, or 
	multiplayer games; but you can use it for any web application 
	project - top to bottom."

http://sailsjs.org/


The developers of Sails.js made available a JavaScript Client SDK called sails.io.js (https://github.com/balderdashy/sails.io.js) which allows realtime communication with your sails application via sockets from Node.js or the browser. 

###What is Sails Live?

Sails Live implements this SDK and provides a full function client for requesting and listening to your RESTful routes. This brings you the opportunity to debug and test your whole interfaces and sessions such as automated listening and this even for custom and publish/subscribe events.


###Features:

- Socket connection support for local and remote Sails.js applications / interfaces (remember to configure CORS)
- Requesting of GET, POST, PUT and DELETE routes with custom payload
- Realtime payload validation (JSON validation)
- Request management (edit, remove, sort or inspect your created requests)
- Event registration (on which the connected socket should listen to)
- Create, manage and inspect your listeners
- Observe realtime notifications
- Collapsable response inspector
- Request and listener storage (use of Chrome local storage)

###Prospective:

- Listener queue (list and save all incoming events with date and time information)
- Multiple connections (select the socket you need for each request and listener)
- Connection history
- Automated API tests with configuration
- Import/Export of custom settings




This application is free to use and open source. Source code is available at https://github.com/moehlone/Sails-Live-Chrome-App. 
Feel free to report your issues, suggestions and criticism at GitHub or via email (philipp.moehler@haus11.org).

###Screenshots

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
