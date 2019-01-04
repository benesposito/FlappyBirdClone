function getNextGeneration(prevGeneration) {
	let nextGeneration = [];
	normalizeFitness(prevGeneration);

	for(i = 0; i < prevGeneration.length; i++)
		nextGeneration.push(selectBird(prevGeneration));

	return nextGeneration;
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

	for(let bird of birds)
		sum += bird.fitness;

	for(let bird of birds)
		bird.fitness /= sum;
}
