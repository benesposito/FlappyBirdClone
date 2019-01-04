class Bird {
	constructor(startingX, startingY, size, gravity, brain) {
		this.baseParameters = [startingX, startingY, size, gravity];
		this.x = startingX;
		this.y = startingY;
		this.size = size;
		this.gravity = gravity;

		this.vel = 0;
		this.isDead = false;
		this.score = 0;
		this.fitness = 0;

		if(brain instanceof NeuralNetwork) {
			this.brain = brain;
		} else
			this.brain = new NeuralNetwork(1, 0, 2);
	}

	update() {
		this.vel -= this.gravity;
		this.y -= this.vel;

		if(!this.isDead) {
			if(this.y > height || isNaN(this.y))
				this.isDead = true;
			else if(this.y < 0) {
				this.y = 0;
				this.vel = 0;
			}

			this.fitness = frameCount;
		} else {

		}
	}

	draw() {
		fill(255, 255, 0);
		ellipse(this.x, this.y, this.size)
	}

	think(pipes) {
		let inputs = [];

		inputs[0] = map(this.y, 0, height, 0, 1);

		let decision = this.brain.predict(inputs);
		console.log(decision[0] + ', ' + decision[1]);
		if(decision[1] > decision[0])
			this.jump();
	}

	jump(jumpVel) {
		this.vel = jumpVel;
	}

	copy() {
		return new Bird(this.baseParameters[0], this.baseParameters[1], this.baseParameters[2], this.baseParameters[3], this.brain);
	}
}
