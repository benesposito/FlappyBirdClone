class Pipe {
	constructor() {
		this.x = width;
		this.y = Y_MARGIN + random(height - 2 * Y_MARGIN);
		this.yTop = this.y - PIPE_GAP / 2;
		this.yBot = this.y + PIPE_GAP / 2;

		this.scored = false;
	}

	update(dead) {
		this.x -= PIPE_SPEED;
	}

	draw() {
		fill(0, 255, 0);
		rect(this.x, 0, PIPE_WIDTH, this.yTop);
		rect(this.x, this.yBot, PIPE_WIDTH, height - this.yBot)
	}

	isIntersectingBird(centerX, centerY, radius) { // used this recttangle-circle interaction test: https://yal.cc/rectangle-circle-intersection-test/
		let deltaX = centerX - Math.max(this.x, Math.min(centerX, this.x + PIPE_WIDTH));
		let deltaY = centerY - Math.min(centerY, this.yTop);
		if((deltaX * deltaX + deltaY * deltaY) < (radius * radius))
			return true;
		else {
			let deltaX = centerX - Math.max(this.x, Math.min(centerX, this.x + PIPE_WIDTH));
			let deltaY = centerY - Math.max(this.yBot, Math.min(centerY, this.yBot + height - this.yBot));

			return (deltaX * deltaX + deltaY * deltaY) < (radius * radius)
		}
	}
}
