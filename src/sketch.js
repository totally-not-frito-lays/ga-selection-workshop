// Genetic Algorithm parameters
const POP_SIZE = 1000;    // number of combinations in a GA generation
const SAMP_SIZE = 100;    // number of candidates in the pool
const MUTATE_RATE = 0.01; // chance of mutation ooccuring per cell

// Genetic Algorithm populations
let selections = [];      // different selection options from the candidates list
let candidates;           // actual candidates (only generated once)

// Desired selection characteristics
const GENDER_RATIO = 0.5;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // 1. Initialize 
  // 1.a. Create candidates list
  candidates = new Population(SAMP_SIZE);
  // 1.b. Create selections list
  for (let i = 0; i < POP_SIZE; i++) {
    selections[i] = new DNA(SAMP_SIZE);
  }
}

function draw() {
  background(220, 100, 200);
  
  // 2. Selection
  // 2.a. Calculte Fitness
  for (let selection of selections) {
    candidates.calculateFitness(selection, GENDER_RATIO);
    // console.log(`selection: ${selection.genes}\nfitness: ${selection.fitness}`);
  }
  drawCandidates(0, 0, candidates.roster);
  noLoop();
}

function drawCandidates(x, y, candidates) {
  let rows = 5;
  let cols = SAMP_SIZE / rows;
  let size = calcStandardSize(SAMP_SIZE, rows);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let box_h = col * size;
      let box_w = row * size;
      drawCandidate(x + box_h, y + box_w, size, candidates[row + col]);
    }
  }
}

function drawCandidate(x, y, size, stats) {
  rect(x, y, size);
  let font_size = size / 2;
  textSize(font_size);
  let xoff = size/2 - font_size/3;
  let yoff = size/2 + font_size/3;
  text(stats["gender"], x + xoff, y + yoff);
}

function calcStandardSize(populationSize, rows) {
  return width / (populationSize / rows);
}
