////////////////////////////
/////// HTTP PORTION ///////
////////////////////////////

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	// console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
}

// global variable for brightness
var brightness; 

/////////////////////////////
///////  WEB SOCKETS  ///////
/////////////////////////////

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		/// MY SOCKET EVENTS HERE

		socket.on('led', function(data) {
			brightness = data; 
			console.log('brightness: ' + brightness); 

			// send brightness to serial port 
			sendBrightness(); 
		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});

	}
);

////////////////////////////
/////// SERIAL STUFF ///////
////////////////////////////

// start by connecting to the serial port! 

// npm install serialport

// include the library 
var serialport = require('serialport'); 

// make a local instance of th elibary 

var SerialPort = serialport.SerialPort; 
// SerialPort is a method of serialport library
// we will use local instance serialPort from here on

/// FIRST - list all the serial ports 
// we need to find the one that our arduino is on 

// this is helpful to list all of the ports in this lib
// port might change depending which outlet arduino is on
// serialport.list(function(err, ports){
// 	ports.forEach(function(port){
// 		console.log(port.comName); 
// 	}); 
// });

//get the port from the command line 
//port that the board is connected to
var portName = '/dev/cu.usbserial-DN02B6ZY';

//open the port 
var myPort = new SerialPort(portName, {
	// set baud rate to the same as Arduino
	baudRate: 9600,
	// parse the data - return with a newline
	parser: serialport.parsers.readline('\n')
});

// serial events - built into serialport library 
// event names are built in, callback WE write
// callback is the second property
myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

/*
function sendBrightness() {
	// convert brightness value to an ASCII string
	// sending data to port for LED
	myPort.write(brightness.toString());

}
*/ 

function showPortOpen(){
	console.log('port opened. data rate: ' + myPort.options.baudRate);
}

function sendSerialData(data){
	// THIS IS WERE THE DATA COMES IN
	console.log('sensor: ' + data);

	// we read the data drom the serial port
	// now let's send it out via a websocket

	// send info to everyone
	io.sockets.emit('sensor', data);
}

function showPortClose(){
	console.log('port closed');
}

function showError(){
	console.log('serial port error: ' + error);
}