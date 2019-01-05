function getNextGeneration(prevGeneration) {
	let nextGeneration = [];

	normalizeFitness(prevGeneration);

	let bestBird = prevGeneration[0];

	for(let bird of prevGeneration)
		if(bird.fitness > bestBird.fitness)
			bestBird = bird;

	nextGeneration[0] = bestBird.copy();

	for(i = 1; i < prevGeneration.length; i++) {
		let bird = selectBird(prevGeneration);
		bird.brain.mutate(mutate);
		nextGeneration.push(bird);
	}

	return nextGeneration.slice();
}

function selectBird(birds) {
	let r = random(1);
	let index = 0;

	for(let bird of birds) {
		if(r - bird.fitness < 0)
			return bird.copy();
		else
			r -= bird.fitness;
	}
}

function normalizeFitness(birds) {
	let sum = 0;

	for(let bird of birds) {
		bird.fitness *= bird.fitness;
		sum += bird.fitness;
	}

	for(let bird of birds)
		bird.fitness /= sum;
}

function mutate(x) { // copied from https://github.com/shiffman/NOC-S18/blob/master/week10/neuroevolution-flappybird/bird.js
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}
