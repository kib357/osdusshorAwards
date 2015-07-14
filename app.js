/**
 * Created by kib357 on 04.03.2015.
 */

var express = require('express');
var compression = require('compression');
var app = express();
app.use(compression());
app.use(express.static(__dirname + '/dist'));
app.set('port', process.env.Port || 4000);
var server = app.listen(app.get('port'));
console.log("app.js up and running on port " + app.get('port'));
