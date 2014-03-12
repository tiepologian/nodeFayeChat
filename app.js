#!/usr/bin/node

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    faye = require('faye'),
    path = require('path'),
    model = require('./models/redis');


app.configure(function() {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(app.router);
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('view engine', 'jade');
    app.set("model", model);
    // setup the data model    
    model.setup();
});


var routes = require('./routes/chat')(app);
var heartbeatRoutes = require('./routes/heartbeat')(app);
var bayeux = new faye.NodeAdapter({mount: '/chat', timeout: 45});
bayeux.attach(server);
server.listen(8000);
console.log("[127.0.0.1 %s] Server up and listening on port 8000", new Date().toISOString());

