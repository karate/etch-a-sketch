class Etch {
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
	var app = new Etch();

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
				if (app.currentColor == 'black') {
					app.currentColor = 'red';
					document.getElementById('color-red').click();
				}
				else {
					app.currentColor = 'black';
					document.getElementById('color-black').click();
				}
				break;

			case ';':
				if (app.speed == 1) {
					document.getElementById('speed-double').click();
				}
				else if (app.speed == 2) {
					document.getElementById('speed-half').click();
				}
				else if (app.speed == 0.5) {
					document.getElementById('speed-normal').click();
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
			app.moveLeft();
		}
		if (keysPressed['s']) {
			app.moveRight();
		}
		if (keysPressed['k']) {
			app.moveUp();
		}
		if (keysPressed['l']) {
			app.moveDown();
		}
	};
	
	var interval = setInterval(drawInterval, 20/app.speed);

	document.getElementById('speed-half').addEventListener('click', function() {
		clearInterval(interval);
		app.speed = 0.5;
		interval = setInterval(drawInterval, 20/app.speed);
	});

	document.getElementById('speed-normal').addEventListener('click', function() {
		clearInterval(interval);
		app.speed = 1;
		interval = setInterval(drawInterval, 20/app.speed);
	});

	document.getElementById('speed-double').addEventListener('click', function() {
		clearInterval(interval);
		app.speed = 2;
		interval = setInterval(drawInterval, 20/app.speed);
	});

	document.getElementById('color-red').addEventListener('click', function() {
		app.setColor('red');
	});

	document.getElementById('color-black').addEventListener('click', function() {
		app.setColor('black');
	});

	var optionElements = document.getElementsByTagName('input');
	for (var i = 0; i < optionElements.length; i++) {
		let input = optionElements[i];
		input.addEventListener('change', function(e){
			for (var j = 0; j < optionElements.length; j++) {
				if (optionElements[j].checked == false)
					optionElements[j].parentElement.classList.remove('selected');
			}
			input.parentElement.classList.add('selected');
			if (input.checked) {
				input.classList.add('selected');
			}
			else {
				input.classList.remove('selected');
			}
		});
	}
}
