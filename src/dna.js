function generateSingle() {
  return random([true, false]);
}

class DNA {
  constructor(size) {
    this.genes = [];

    for (let i = 0; i < length; i++) {
      this.genes[i] = generateSingle();
    }
  }
}