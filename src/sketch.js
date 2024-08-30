// Genetic Algorithm parameters
const POP_SIZE = 200;    // number of combinations in a GA generation
const SAMP_SIZE = 100;    // number of candidates in the pool
const MUTATE_RATE = 0.01; // chance of mutation ooccuring per cell

// Genetic Algorithm populations
let selections = [];      // different selection options from the candidates list
let candidates;           // actual candidates (only generated once)

// Desired selection characteristics
const GENDER_RATIO = 0.7;

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
  // background(220, 100, 200);
  
  // Primary candidate list shows all the characteristics just once at full size
  let candidate_dimensions = drawCandidates(0, 0, candidates.roster, true);
  let candidate_h = candidate_dimensions[0];
  let candidate_w = candidate_dimensions[1];

  // 2. Selection
  // 2.a. Calculte Fitness
  for (let selection of selections) {
    candidates.calculateFitness(selection, GENDER_RATIO);
    // console.log(`selection: ${selection.genes}\nfitness: ${selection.fitness}`);
  }
  
  drawSelections(candidate_h, candidate_w);

  // Display secondary lists at 1/8 scale
  noLoop();
}

function drawCandidates(x, y, candidates, display_feature) {
  let rows = 5;
  let cols = SAMP_SIZE / rows;
  let size = width / (SAMP_SIZE / rows);
  let candidate_h = rows * size;
  let candidate_w = cols * size;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let box_h = col * size;
      let box_w = row * size;
      drawCandidate(x + box_h, y + box_w, size, candidates[row + col], 
        display_feature, false, false
      );
    }
  }

  return [candidate_h, candidate_w];
}

function drawCandidate(x, y, size, stats, display_feature, 
  display_selection, selected) {
  if (display_selection) {
    // Color the rectangle if it's been selected
    const fill_color = selected ? "green" : "red";
    fill(fill_color);
  }
  
  rect(x, y, size);

  if (display_feature) {
    // Display the currently selected feature
    let font_size = size / 2;
    textSize(font_size);
    let xoff = size/2 - font_size/3;
    let yoff = size/2 + font_size/3;
    text(stats["gender"], x + xoff, y + yoff);
  }
}

function drawSelections(candidate_h, candidate_w) {
  // Draw selection grids
  let x = 0;
  let y = candidate_h;
  let max_x = candidate_w;
  let max_y = height;
  let selection_h = candidate_h / 8;
  let selection_w = candidate_w / 8;
  for (let selection of selections) {
    console.log(selection);
    let x_bound_check = x > max_x;
    let y_bound_check = y > max_y;
    if (y_bound_check) {
      // no more room in the canvas to make a new row
      break;
    }
    if (x_bound_check) {
      // start new row
      x = 0;
      y += selection_h;
      drawSelection(x, y, selection, true);
    } else {
      // start new column
      drawSelection(x, y, selection, true);
      x += selection_w;
    }
  }
}

function drawSelection(x, y, selection, display_selection) {
  console.log(selection);
  let rows = 5;
  let cols = SAMP_SIZE / rows;
  let size = width / (SAMP_SIZE / rows) * (1/8);
  let candidate_h = rows * size;
  let candidate_w = cols * size;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let box_h = col * size;
      let box_w = row * size;
      let selected = false;
      if (selected !== null) {
        selected = selection.genes[row + col];
      }
      drawCandidate(x + box_h, y + box_w, size, candidates[row + col], 
        false, display_selection, selected
      );
    }
  }

  return [candidate_h, candidate_w];
}
