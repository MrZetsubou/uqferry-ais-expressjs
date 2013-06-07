var express = require('express')
  , http = require('http')
  , mqtt = require('mqtt');
var sys = require('sys');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});
var client;

io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function (data) {
        console.log('Socket Connected '+ data.topic);
        client = new mqtt.createClient(1883, 'winter.ceit.uq.edu.au',
                      {keepalive: 10000});

        client.on('connect', function() {
          //console.log('connected to winter.ceit.uq.edu.au:1883');
          client.subscribe('/uq/ferry/json1');
          //client.publish('/uq/ferry/json1', 'TESTing....');
          //console.log('Subscribed to /uq/ferry/json1');
          client.on('message', function(topic, message) {
            console.log('TOPIC: ' + topic + ' PAYLOAD: ' + message);
            //sys.puts(topic+'='+message);
            io.sockets.emit('mqtt',{'topic':String(topic), 'payload':String(message)});
          });
       });

    });
});

app.get('/', function (req, res) {
  res.render('index',
   {
    title: 'Mqtt Test',
    scripts: ['javascripts/mosq.js',
               'http://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=false',
               'javascripts/mosquitto.js',
               '../socket.io/socket.io.js',
               'javascripts/JSON-js/json2.js',
               'javascripts/mymaps.js']
  })
});

server.listen(3000);

