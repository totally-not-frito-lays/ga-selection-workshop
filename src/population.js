class Population {
  constructor(size) {
    this.population = [];
    for (let i = 0; i < size; i++) {
      population[i] = {
        "gender": this.generateGender(),
      };
    }
    return population;
  }

  generateGender() {
    return random(["M", "F"]);
  }
}