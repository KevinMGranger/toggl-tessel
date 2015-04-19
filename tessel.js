var tes = require('tessel');
var http = require('http');

var pins = tes.ports.GPIO.pin;

var status;

function setOn() {
  pins.g2.output(1);
  pins.g3.output(0);
  status = true;
  console.log("on");
}

function setOff() {
  pins.g2.output(0);
  pins.g3.output(1);
  status = false;
  console.log("off");
}

function toggle() {
  if (status) setOff();
  else setOn();
}

var server = http.createServer(function(req, res) {
  toggle();
  res.writeHead(200);
  res.end();
});

console.log("preparing to listen");

server.listen(80, function() {

  var host = server.address().address;
  var port = server.address().port;

  setOff();
  console.log('Listening at http://%s:%s', host, port);
});
