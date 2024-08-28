class DNA {
  constructor(size) {
    this.genes = [];
    this.fitness = 0;

    for (let i = 0; i < size; i++) {
      this.genes[i] = randomSelection();
    }
    this.calculateFitness();
    
    console.log(`Genes: ${this.genes}`);
    console.log(this.fitness);
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
    const score_min = 0;
    const score_max = calculateRatioMax(target);
    const normalized_min = 0.0;
    const normalized_max = 1.0;
    const normalized_score = normalizeScore(score, 
      score_min, score_max, 
      normalized_min, normalized_max
    );
    return normalized_score;
  }

  /**
   * Takes 2 parents and returns a new child with mixed genes. The crossover 
   * algorithm used is the coinflip algorithm where each genome in the sequence
   * is randomly chosen to be from parent A or parent B.
   * 
   * @returns a new selection of candidates
   */
  crossover(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (randomSelection) {
        // Parent 1
        child.genes[i] = this.genes[i];
      } else {
        // Parent 2
        child.genes[i] = partner.genes[i];
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