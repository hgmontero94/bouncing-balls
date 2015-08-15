var size = { width: screen.width, height: screen.height };

var canvas, context, FRAME_RATE = 60, balls = [];

var Ball = (function() {
	function Ball(radius, position, velocity, fill, stroke) {
		this.radius = radius;
		this.position = position;
		this.velocity = velocity;
		this.fill = fill;
		this.stroke = stroke;
	}

	Ball.prototype.move = function() {
		this.position[0] += this.velocity[0];
		this.position[1] += this.velocity[1];

		if (this.position[0] <= this.radius) {
			this.position[0] = this.radius;
			this.velocity[0] *= (-1);
		} else if (this.position[0] >= size.width - this.radius) {
			this.position[0] = size.width - this.radius;
			this.velocity[0] *= (-1);
		}

		if (this.position[1] <= this.radius) {
			this.position[1] = this.radius;
			this.velocity[1] *= (-1);
		} else if (this.position[1] >= size.height - this.radius) {
			this.position[1] = size.height - this.radius;
			this.velocity[1] *= (-1);
		}
	}

	Ball.prototype.draw = function draw(context) {
		context.beginPath();
		
		context.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
		
		context.fillStyle = this.fill;
		context.fill();

		context.strokeStyle = this.stroke;
		context.stroke();

		context.closePath();
	}

	return Ball;
})();

function randRange(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randColor() {
	var LETTERS = "0123456789ABCDEF".split(""), color = "#";

	for (var i = 0; i < 6; i++) {
		color += LETTERS[randRange(0, LETTERS.length)];
	}

	return color;
}

function choice(items) {
	return items[randRange(0, items.length)];
}

function update() {
	context.clearRect(0, 0, size.width, size.height);

	for (var idx in balls) {
  		balls[idx].draw(context);
  		balls[idx].move();
  	}
}

function load() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.width = size.width;
	canvas.height = size.height;

	var velocities = [-4, -2, 2, 4];

	for (var i = 0; i < 50; i++) {
		var radius = 25, 
			position = [randRange(radius, size.width - radius + 1), randRange(radius, size.height - radius + 1)],
			velocity = [choice(velocities), choice(velocities)],
			fill = randColor(),
			stroke = "#000000";

		balls[i] = new Ball(radius, position, velocity, fill, stroke);
	}

	setInterval(update, 1000.0 / FRAME_RATE);
}

window.onresize = function() {
	size.width = screen.width;
	size.height = screen.height;

	canvas.width = size.width;
	canvas.height = size.height;
}

window.onload = function() {
	load();
}