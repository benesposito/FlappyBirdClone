class Bird {
	constructor(startingX, startingY, size, gravity, pipeSpeed) {
		this.x = startingX;
		this.y = startingY;
		this.size = size;
		this.gravity = gravity;
		this.pipeSpeed = pipeSpeed;
		
		this.vel = 0;
		this.isDead = false;
		this.score = 0;
	}

	update() {
		this.vel -= this.gravity;
		bird.y -= this.vel;

		if(this.isDead) {
			this.x -= this.pipeSpeed;

			if(this.vel > 0)
				this.vel = 0;
		}
	}

	draw() {
		fill(255, 255, 0);
		ellipse(this.x, this.y, this.size)
	}

	jump(jumpVel) {
		this.vel = jumpVel;
	}
}
