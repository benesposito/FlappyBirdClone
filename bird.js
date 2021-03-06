class Bird {
	constructor(brain) {
		this.x = BIRD_STARTING_X;
		this.y = BIRD_STARTING_Y;
		this.size = BIRD_SIZE;

		this.vel = 0;
		this.isDead = false;
		this.fitness = 0;

		if(brain instanceof NeuralNetwork)
			this.brain = brain;
		else
			this.brain = new NeuralNetwork(6, 12, 2);
	}

	update() {
		this.vel -= GRAVITY;
		this.y -= this.vel;

		if(!this.isDead) {
			if(this.y > height)
				this.isDead = true;
			else if(this.y < 0) {
				this.y = 0;
				this.vel = 0;
			}
		} else {

		}
	}

	draw(opacity) {
		stroke(0, opacity == undefined? 255 : opacity);
		fill(255, 255, 0, opacity == undefined? 255 : opacity);
		ellipse(this.x, this.y, this.size)
	}

	think(pipes) {
		let inputs = [];

		inputs[0] = map(this.y, 0, height, 0, 1);
		inputs[1] = map(this.vel, 0, JUMP_VEL, 0, 1);
		inputs[2] = map(pipes[0].x - this.x, -PIPE_WIDTH / 2, width - this.x, 0, 1);
		inputs[3] = map(pipes[0].y - this.y, -height, height, 0, 1);

		if(pipes.length >= 2) {
			inputs[4] = map(pipes[1].x - this.x, -PIPE_WIDTH / 2, width - this.x, 0, 1);
			inputs[5] = map(pipes[1].y - this.y, -height, height, 0, 1);
		} else {
			inputs[4] = map(width, 0, width, 0, 1);
			inputs[5] = map(height / 2, 0, height, 0, 1);
		}

		let decision = this.brain.predict(inputs);

		if(decision[0] > decision[1])
			this.jump();
	}

	jump() {
		this.vel = JUMP_VEL;
	}

	copy() {
		return new Bird(this.brain.copy());
	}
}
