class Pipe {
	constructor(x, y, pipeWidth, ySeparation, speed) {
		this.x = x;
		this.yTop = y - ySeparation / 2;
		this.yBot = y + ySeparation / 2;
		this.pipeWidth = pipeWidth;
		this.ySeparation = ySeparation;
		this.speed = speed;
		
		this.scored = false;
	}

	update(dead) {
		this.x -= this.speed;
	}

	draw() {
		fill(0, 255, 0);
		rect(this.x, 0, this.pipeWidth, this.yTop);
		rect(this.x, this.yBot, this.pipeWidth, height - this.yBot)
	}

	isIntersectingBird(centerX, centerY, radius) { // used this recttangle-circle interaction test: https://yal.cc/rectangle-circle-intersection-test/
		let deltaX = centerX - Math.max(this.x, Math.min(centerX, this.x + this.pipeWidth));
		let deltaY = centerY - Math.min(centerY, this.yTop);
		if((deltaX * deltaX + deltaY * deltaY) < (radius * radius))
			return true;
		else {
			let deltaX = centerX - Math.max(this.x, Math.min(centerX, this.x + this.pipeWidth));
			let deltaY = centerY - Math.max(this.yBot, Math.min(centerY, this.yBot + height - this.yBot));

			return (deltaX * deltaX + deltaY * deltaY) < (radius * radius)
		}
	}
}
