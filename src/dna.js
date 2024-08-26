class DNA {
  constructor(size) {
    this.genes = [];
    this.population = new Population();
    this.fitness = 0;

    for (let i = 0; i < size; i++) {
      this.genes[i] = randomSelection();
    }
    console.log(this.genes);
  }

  calculateFitness() {
    const w1 = 1;
    const score = w1 * this.scoreGenderRatio(0.5);
    this.fitness = score;
  }
  
  /**
   * Scores the sample choices based on the distance from the desired gender
   * ratio. The ratio is (Male / (Female + Other)).
   * 
   * @param {*} target desired gender ratio
   */
  scoreGenderRatio(target) {
    let male = 0;
    let female = 0;
    let other = 0;
    let ratio = 0.0;

    for (let i = 0; i < this.population.length; i++) {
      const curr_gender = this.population[i]["gender"] == "M";
      if (curr_gender == "M") {
        male++;
      }
      else if (curr_gender == "F") {
       female++; 
      } else {
        other++;
      }
    }

    ratio = male / (female + other);
    const score = Math.abs(target - ratio);
    const max_score = calculateRatioMax(target);
    const normalized_score = normalizeScore(score, 0, max_score, 0.0, 1.0);
    return normalized_score;
  }

  crossover() {
    let child = new DNA(this.genes.length);
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i < midpoint) {
        child.genes[i] = this.genes[i];
      }
    }
    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = randomSelection();
      }
    }
  }
}

// Helper Functions

function randomSelection() {
  return random([true, false]);
}

function normalizeScore(score, score_min, score_max, normalized_min, normalized_max) {
  return map(score, score_min, score_max, normalized_min, normalized_max);
}

function calculateRatioMax(target) {
  if (target < 0.5) {
    return 1.0 - target;
  } else {
    return target;
  }
}