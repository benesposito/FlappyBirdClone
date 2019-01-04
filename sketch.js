const PIPE_PADDING = 10;
const PIPE_WIDTH = 70;
const PIPE_SEPARATION = 200;
const Y_MARGIN = PIPE_PADDING + PIPE_SEPARATION / 2;
const PIPE_SPEED = 8;
const PIPE_DIFFERENCE = 352;

const BIRD_STARTING_X = 100;
const BIRD_SIZE = 50;
const GRAVITY = 0.25;
const JUMP_VEL = 7;

const POPULATION = 10;

let pipes = [];
let livingBirds = [];
let deadBirds = [];
let paused = false;
let gameOver = false;
let highScore = 0;

function setup() {
	createCanvas(1000, 480);
	background(144, 206, 255);
	frameRate(60);

	// Generate initial population

	for(i = 0; i < POPULATION; i++)
		livingBirds.push(new Bird(BIRD_STARTING_X, height / 2, BIRD_SIZE, GRAVITY));
}

function draw() {
	if(!paused && !gameOver) {
		background(144, 206, 255);

		if((frameCount - 1) % (PIPE_DIFFERENCE / PIPE_SPEED) == 0)
			pipes.push(new Pipe(width, Y_MARGIN + random(height - 2 * Y_MARGIN), PIPE_WIDTH, PIPE_SEPARATION, PIPE_SPEED));

		if(livingBirds.length == 0) {
			livingBirds = getNextGeneration(deadBirds);
			restart();
		}

		for(i = livingBirds.length - 1; i >= 0; i--) {
			let bird = livingBirds[i];

			bird.update();
			bird.think(pipes);
			bird.draw();

			if(bird.score > highScore)
				highScore = bird.score;

			if(bird.isDead) {
				deadBirds.push(bird);
				livingBirds.splice(i, 1);
			}
		}

		for(var i = pipes.length - 1; i >= 0; i--) {
			let pipe = pipes[i];
			pipe.update();

			for(let bird of livingBirds) {
				if(!pipe.scored && pipe.x < bird.x) {
					bird.score++;
					pipe.scored = true;
				}

				if(pipe.isIntersectingBird(bird.x, bird.y, bird.size / 2)) {
					bird.isDead = true;
				}
			}

			if(pipe.x + pipe.pipeWidth < 0) {
				pipes.splice(i, 1);
				continue;
			}

			pipe.draw();
		}

		fill(0);
		textSize(45);
		// text(bird.score, 10, height - 50);
		text(highScore, 10, height - 8);
		text(Math.round(frameRate()), 70, height - 8);
	} else if(gameOver) {

	}
}

function keyPressed() {
	/*if(key === ' ')
		bird.jump(JUMP_VEL);
	else */if(key === 'p')
		paused = !paused;
	else if(key === 'r')
		restart();
}

function restart() {
	pipes = [];
	deadBirds = [];
	gameOver = false;
	paused = false;
}
