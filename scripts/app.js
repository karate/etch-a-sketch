class App {
	constructor() {
		this.brushSize = 1;
		var canvas = document.getElementById('sketch');
		this.ctx = canvas.getContext("2d");
		this.ctx.fillStyle = "#444";

		this.pos = {
			x: 400,
			y: 599
		}

		this.draw();
	}

	moveUp() {
		this.pos.y = this.pos.y - 1;
		if (this.pos.y < 1) this.pos.y = 1;
		this.draw();
	}

	moveDown() {
		this.pos.y = this.pos.y + 1;
		if (this.pos.y > 599) this.pos.y = 599;
		this.draw();
	}
	
	moveRight() {
		this.pos.x = this.pos.x + 1;
		if (this.pos.x > 799) this.pos.x = 799;
		this.draw();
	}
	
	moveLeft() {
		this.pos.x = this.pos.x - 1;
		if (this.pos.x < 1) this.pos.x = 1;
		this.draw();
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.brushSize, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}

window.onload = function(){
	window.app = new App();

	var keysPressed = {};

	document.addEventListener('keydown', function(e){
		var key = e.key.toLowerCase();
		switch(key) {
			case 'a':
				keysPressed[key] = true;
				break;

			case 's':
				keysPressed[key] = true;
				break;

			case 'k':
				keysPressed[key] = true;
				break;

			case 'l':
				keysPressed[key] = true;
				break;
		}
	});

	document.addEventListener('keyup', function(e){
		var key = e.key.toLowerCase();
		delete keysPressed[key];
	});

	window.setInterval(function(){
		if (keysPressed['a']) {
			window.app.moveLeft();
		}
		if (keysPressed['s']) {
			window.app.moveRight();
		}
		if (keysPressed['k']) {
			window.app.moveUp();
		}
		if (keysPressed['l']) {
			window.app.moveDown();
		}
	}, 20);
}
