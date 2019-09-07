var dvd;
var confetti = [];
var looping = true;
function preload() {
	dvdImg = loadImage("dvd.png");
}
function setup() {
	createCanvas(windowWidth-20,windowHeight-20);
	dvd = new DVD();
	resetConfetti();
}
function windowResized() {
	createCanvas(windowWidth-30,windowHeight-30);
}
function draw() {
	background(30, 32, 35);
	handleDVD();
	handleConfetti();
}
function keyPressed() {
	if(key == ' ') {
		if(looping == true) { 
			noLoop(); 
			looping = false;
		}
		else if (looping == false) { 
			loop(); 
			looping = true;
		}
	}

}
function handleDVD() {
	dvd.draw();
	dvd.update();
}
function handleConfetti() {
	for(i=0; i < confetti.length; i++) {
		confetti[i].draw();
		confetti[i].update();

		if(confetti[i].y > height*50) {
			confetti.splice(i);
		}
	}
}
function resetConfetti() {
	for(i = 0; i<1000; i++) {
		confetti[i] = new Confetti();
	}
}
function DVD() {
	this.scl = width*height*0.00000015;
	this.width = this.scl * 1025;
	this.height = this.scl * 589;
	this.x = Math.floor(Math.random() * (width - this.width)); 
	this.y = Math.floor(Math.random() * (height - this.height));

	this.r = Math.floor(Math.random() * 256);
	this.g = Math.floor(Math.random() * 256);
	this.b = Math.floor(Math.random() * 256);

	this.vx = -6;
	this.vy = 6;

	this.draw = function() {
		image(dvdImg, this.x, this.y, this.width, this.height);
	}
	this.changeColor = function() {
		this.r = Math.floor(Math.random() * 256);
		this.g = Math.floor(Math.random() * 256);
		this.b = Math.floor(Math.random() * 256);
	}
	this.hitsCorner = function(x, y) {
		return (
			(Math.abs(this.x) <= Math.abs(this.vx) && Math.abs(this.y) <= Math.abs(this.vy))
			|| (Math.abs(this.x) <= Math.abs(this.vx)  && Math.abs(this.y+this.height-height) <= Math.abs(this.vy))
			|| (Math.abs(this.x+this.width-width) <= Math.abs(this.vx) && Math.abs(this.y) <= Math.abs(this.vy))
			|| (Math.abs(this.x+this.width-width) <= Math.abs(this.vx) && Math.abs(this.y+this.height-height) <= Math.abs(this.vy)))
	}
	this.update = function() {
		tint(this.r, this.g, this.b);
		this.x += this.vx;
		this.y += this.vy;

		if(this.x >= (width - this.width) || this.x <= 0) {
			this.vx *= -1;
			this.vy += Math.random()*2-1;
			this.changeColor();
		}
		if(this.y >= (height - this.height) || this.y <= 0) {
			this.vy *= -1;
			this.vx += Math.random()*2-1;
			this.changeColor();
		}
		if(this.hitsCorner(this.x, this.y)) {
			resetConfetti();
			for(i=0; i<confetti.length; i++){
				confetti[i].play = true;
			}
		}
	}
}
function Confetti() {
	this.r = Math.floor(Math.random() * 256);
	this.g = Math.floor(Math.random() * 256);
	this.b = Math.floor(Math.random() * 256);

	this.w = Math.random() * 10 + 5;
	this.h = Math.random() * 10 + 5;
	this.x = Math.floor(Math.random() * width);
	this.y = -Math.floor(Math.random() * 800)-this.h;

	this.vy = 10 - Math.random()*2;
	this.ay = Math.random() * 4 + 0.3;

	this.play = false;

	this.draw = function() {
		noStroke();
		fill(this.r, this.g, this.b);
		rect(this.x, this.y, this.w, this.h);
	}
	this.update = function() {
		if(this.play == true) {
			this.y += this.vy;
			this.vy += this.ay;
		}
	}
}