const POP_SIZE = 1000;    // number of combinations in a GA generation
const SAMP_SIZE = 100;    // number of candidates in the pool
const MUTATE_RATE = 0.01; // chance of mutation ooccuring per cell

let population = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // 1. Initialize population
  for (let i = 0; i < POP_SIZE; i++) {
    population[i] = new DNA(SAMP_SIZE);
  }
}

function draw() {
  background(220, 100, 200);
  
  // 2. Selection
  // 2.a. Calculte Fitness
  // for (let selection of population) {
  //   selection.
  // }
  drawStudentPopulation(0, 0, new Population(SAMP_SIZE));
  noLoop();
}

function drawStudentPopulation(x, y, population) {
  let rows = 5;
  let cols = SAMP_SIZE / rows;
  let size = calcSize(SAMP_SIZE, rows);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let box_h = col * size;
      let box_w = row * size;
      drawStudent(x + box_h, y + box_w, size, population[row + col]);
    }
  }
}

function drawStudent(x, y, size, stats) {
  rect(x, y, size);
  let font_size = size / 2;
  textSize(font_size);
  let xoff = size/2 - font_size/3;
  let yoff = size/2 + font_size/3;
  text(stats["gender"], x + xoff, y + yoff);
}

function calcSize(populationSize, rows) {
  return width / (populationSize / rows);
}
