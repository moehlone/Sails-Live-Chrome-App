#What is Sails Live?

Sails Live is a WebSocket Client to maintain and debug your [Sails.js](http://sailsjs.org/) realtime applications. It supports all the functionality of the [Sails.js JavaScript Client SDK](https://github.com/balderdashy/sails.io.js) providing a lightweight user interface to manage requests and event listeners.

###Download

The application is available as Google Chrome Plugin and can be downloaded [here](https://chrome.google.com/webstore/detail/sails-live/hcabckokmgcienfmiadckelpjhhnfklp).


###Features

- Socket connection support for local and remote Sails.js applications / interfaces (remember to configure CORS)
- Requesting of GET, POST, PUT and DELETE routes with custom payload
- Realtime payload validation (JSON validation)
- Request management (edit, remove, sort or inspect your created requests)
- Event registration (on which the connected socket should listen to)
- Create, manage and inspect your listeners
- Observe realtime notifications
- Collapsable response inspector
- Request and listener storage (use of Google Chrome local storage)

###Prospective

- Listener queue (list and save all incoming events with date and time information)
- Multiple connections (select the socket you need for each request and listener)
- Connection history
- Automated API tests with configuration
- Import/Export of custom settings


###Screenshots

![Connect to your Sails.js Application](https://raw.githubusercontent.com/moehlone/Sails-Live-Chrome-App/screenshots/1.png)


----------


![Connect to your Sails.js Application](https://raw.githubusercontent.com/moehlone/Sails-Live-Chrome-App/screenshots/2.png)


----------


![Connect to your Sails.js Application](https://raw.githubusercontent.com/moehlone/Sails-Live-Chrome-App/screenshots/4.png)


#Contribute

This application is free to use and open source. Contributions are welcome and also feel free to report your issues or suggestions at GitHub or via [email](philipp.moehler@haus11.org).

### Getting started

The first thing to do is to clone this repository and run
	
	npm install

After that make sure to install all bower components

	bower install

To start the the node.js server go into the root directory and run 

	grunt serve

The server will watch any file changes, inject bower components and automatically lints your scripts and restarts the server.

For building the chrome application you have to run

	grunt build

Import the newly updated/created dist folder to chrome for plugin creation.


#License

The MIT License (MIT)

Copyright (c) [2015] [Philipp Möhler]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
