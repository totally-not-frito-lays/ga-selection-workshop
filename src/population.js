class Population {
  constructor(size) {
    let population = [];
    for (let i = 0; i < size; i++) {
      population[i] = {
        "gender": this.generateGender(),
      };
    }
  }

  generateGender() {
    return random(["M", "F"]);
  }
}