const POP_SIZE = 1000;    // number of combinations in a generation
const SAMP_SIZE = 100;    // number of candidates in the pool

let population = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < population.length; i++) {
    population[i] = new DNA(SAMP_SIZE);
  }
}

function draw() {
  background(220, 100, 200);
  drawStudentPopulation(0,0, generatePopulation());
  noLoop();
}

function generatePopulation() {
  let population = [SAMP_SIZE];
  for (let i = 0; i < SAMP_SIZE; i++) {
    population[i] = {
      "gender": random(["M", "F"])
    }
  }
  return population;
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
