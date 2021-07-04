class App {
	constructor() {
		this.brushSize = 1;
		var canvas = document.getElementById('sketch');
		this.ctx = canvas.getContext("2d");
		this.colors = {
			'red': '#ce0000',
			'black': '#444'
		}
		this.currentColor = 'black';

		this.speed = 1;

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
		this.ctx.fillStyle = this.colors[this.currentColor];
		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.brushSize, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	setColor(color) {
		if (color == 'black' || color == 'red') {
			this.currentColor = color;
		}
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

			case ' ':
				if (window.app.currentColor == 'black') {
					window.app.currentColor = 'red';
					document.getElementById('color-red').checked = true;
				}
				else {
					window.app.currentColor = 'black';
					document.getElementById('color-black').checked = true;
				}
				break;
			}
	});

	document.addEventListener('keyup', function(e){
		var key = e.key.toLowerCase();
		delete keysPressed[key];
	});

	function drawInterval() {
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
	};
	
	var interval = setInterval(drawInterval, 20/window.app.speed);

	document.getElementById('speed-half').addEventListener('click', function() {
		clearInterval(interval);
		window.app.speed = 0.5;
		interval = setInterval(drawInterval, 20/window.app.speed);
	});

	document.getElementById('speed-normal').addEventListener('click', function() {
		clearInterval(interval);
		window.app.speed = 1;
		interval = setInterval(drawInterval, 20/window.app.speed);
	});

	document.getElementById('speed-double').addEventListener('click', function() {
		clearInterval(interval);
		window.app.speed = 2;
		interval = setInterval(drawInterval, 20/window.app.speed);
	});

	document.getElementById('color-red').addEventListener('click', function() {
		window.app.setColor('red');
	});

	document.getElementById('color-black').addEventListener('click', function() {
		window.app.setColor('black');
	});
}
