const PIPE_PADDING = 10;
const PIPE_WIDTH = 70;
let   PIPE_GAP = 250;//200;
const Y_MARGIN = PIPE_PADDING + PIPE_GAP / 2;
const PIPE_SPEED = 8;
const PIPE_SPREAD = 400;

const BIRD_STARTING_X = 100;
let   BIRD_STARTING_Y;
const BIRD_SIZE = 50;
const GRAVITY = 0.25;
const JUMP_VEL = 7;

const POPULATION = 300;
let genFrameCount = 0;
let gameSpeed = 1;
let genCount = 1;

let pipes = [];
let livingBirds = [];
let deadBirds = [];
let paused = false;
let score = 0;
let highScore = 0;

function setup() {
	createCanvas(850, 720);
	BIRD_STARTING_Y = height / 2;
	background(144, 206, 255);
	frameRate(60);

	// Generate initial population

	for(i = 0; i < POPULATION; i++)
		livingBirds.push(new Bird());
}

function draw() {
	if(!paused) {
		for(test = 0; test < gameSpeed; test++) {
			// Game over condition
			if(livingBirds.length == 0) {
				livingBirds = getNextGeneration(deadBirds);
				nextGen();
			}

			// Create pipes
			if((genFrameCount) % (PIPE_SPREAD / PIPE_SPEED) == 0)
				pipes.push(new Pipe());

			impendingPipes = [];

			for(let pipe of pipes)
				if(pipe.x > BIRD_STARTING_X - PIPE_WIDTH / 2)
					impendingPipes.push(pipe);
			// Update birds
			for(i = livingBirds.length - 1; i >= 0; i--) {
				let bird = livingBirds[i];

				bird.update();
				bird.think(impendingPipes);


				if(bird.isDead) {
					deadBirds.push(bird);
					livingBirds.splice(i, 1);
				} else
					bird.fitness = genFrameCount;
			}

			// Update pipes
			for(i = pipes.length - 1; i >= 0; i--) {
				let pipe = pipes[i];
				pipe.update();

				for(let bird of livingBirds) {
					if(!pipe.scored && pipe.x < bird.x) {
						score++;
						pipe.scored = true;
					}

					if(pipe.isIntersectingBird(bird.x, bird.y, BIRD_SIZE / 2)) {
						bird.isDead = true;
					}
				}

				if(pipe.x + PIPE_WIDTH < 0) {
					pipes.splice(i, 1);
					continue;
				}
			}

			genFrameCount++;
		}

		if(score > highScore)
			highScore = score;

		// Graphics
		background(144, 206, 255);

		for(let bird of livingBirds)
			bird.draw();

		for(let pipe of pipes)
			pipe.draw();

		fill(0);
		textSize(45);
		textAlign(LEFT)
		text(score + ' (' + livingBirds.length + ')', 10, height - 50);
		text(highScore, 10, height - 8);
		//text(Math.round(frameRate()), 70, height - 8);
		textAlign(RIGHT)
		text(genCount, width - 5, height - 8);
	}
}

function keyPressed() {
	/*if(key === ' ')
		bird.jump(JUMP_VEL);
	else */if(key === 'p')
		paused = !paused;
	// else if(key === 'r')
		// restart();
}

function nextGen() {
	pipes = [];
	deadBirds = [];
	score = 0;
	genFrameCount = 0
	genCount++;
}
