const PIPE_PADDING = 10;
const PIPE_WIDTH = 70;
const PIPE_SEPARATION = 250;
const Y_MARGIN = PIPE_PADDING + PIPE_SEPARATION / 2;
const PIPE_SPEED = 8;
const PIPE_DIFFERENCE = 400;

const BIRD_STARTING_X = 100;
const BIRD_SIZE = 50;
const GRAVITY = 0.25;
const JUMP_VEL = 7;

let pipes = [];
let bird;
let paused = false;

function setup() {
	createCanvas(1280, 720);
	background(144, 206, 255);
	frameRate(60);

	bird = new Bird(BIRD_STARTING_X, height / 2, BIRD_SIZE, GRAVITY, PIPE_SPEED);
}

function draw() {
	if(!paused) {
		background(144, 206, 255);

		if((frameCount - 1) % (PIPE_DIFFERENCE / PIPE_SPEED) == 0)
			pipes.push(new Pipe(width, Y_MARGIN + random(height - 2 * Y_MARGIN), PIPE_WIDTH, PIPE_SEPARATION, PIPE_SPEED));

		bird.update();
		bird.draw();

		for(var i = pipes.length - 1; i >= 0; i--) {
			let pipe = pipes[i];

			pipe.update();

			if(!pipe.scored && pipe.x < bird.x) {
				bird.score++;
				pipe.scored = true;
			}

			if(pipe.isIntersectingBird(bird.x, bird.y, bird.size / 2)) {
				bird.isDead = true;
			}

			if(pipe.x + pipe.pipeWidth < 0) {
				pipes.splice(i, 1);
				continue;
			}

			pipe.draw();
		}
	}

	fill(0);
	textSize(45);
	text(bird.score, 10, height - 10);
}

function keyPressed() {
	if(key === ' ')
		bird.jump(JUMP_VEL);
	else if(key === 'p')
		paused = !paused;
}
