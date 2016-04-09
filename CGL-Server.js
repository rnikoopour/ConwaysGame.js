'use strict';
var express = require('express');
var app = express();

var listenPort = 8080;

// Handle routing to static content
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile('cgl.html', {root: __dirname + '/apps/cgl/'});
});

app.listen(listenPort, '0.0.0.0', function() {
    console.log('listening on port: ', listenPort);
});
