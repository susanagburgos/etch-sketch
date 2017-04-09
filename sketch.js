// P5 STUFF ONLY

var sensorOne;
var sensorTwo; 

// map brigthness to mouseX
var brightness; 


function setup() {
	createCanvas(windowWidth/1.5, windowHeight/1.5);
	background('white');
}

function draw() {
	fill(255,223,0);
	noStroke();
	ellipse(sensorOne, sensorTwo, 10, 10);

	// brightness should be a value btwn 0-255, based on mouseX
	// brightness = Math.floor(map(mouseX, 0, width, 0, 255)); 

}

// function mouseClicked() {
// 	fill('aquamarine');
// 	rect(mouseX, mouseY,35,35);
// 	console.log(mouseX);
// 	// send brightness to the server
// 	  socket.emit('led', brightness);
// 	  console.log(brightness); 
// }

// function catchMe() {
// 	fill('aquamarine');
// 	rect(mouseX, mouseY,35,35);
// }

////////////////////////////////////////////////

// all non-p5 javascript needs to go inside init() 
// so that this code executes only AFTER the page has loaded

function init(){

}

window.addEventListener('load', init);


