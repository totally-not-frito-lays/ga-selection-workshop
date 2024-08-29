class DNA {
  constructor(size) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < size; i++) {
      this.genes[i] = randomSelection();
    }
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