class Population {
  constructor(size) {
    this.roster = [];

    for (let i = 0; i < size; i++) {
      this.roster[i] = {
        "gender": random(["M", "F"]),
      };
      // console.log(`generated candidate: ${this.candidates[i]["gender"]}`);
    }
    return this;
  }

  /**
   * Creates a new candidate with randomly generated attributes.
   * 
   * @returns New candidate states
   */
  generateCandidate() {
    // FIXME: currently, we have to generate this in the Population. For some 
    // reason when generating through this helper function, the candidates[i]
    // receives a 0 or sorta bug like that.
    let candidate = {
      "gender": random(["M", "F"]),
    };
    return candidate;
  }

  /**
   * Scores the selection based on how close the selection fits the `target_ratio`
   * @param {Boolean[]} selection the proposed selection of candidates
   * @param {Float} gender_ratio target gender ratio
   */
  calculateFitness(selection, gender_ratio) {
    const w1 = 1;
    const score = w1 * this.scoreGenderRatio(selection, gender_ratio);
    selection.fitness = score;
    return score;
  }
  
  /**
   * Scores the sample choices based on the distance from the desired gender
   * ratio. The ratio is (Male / (Female + Other)).
   * 
   * @param {*} target desired gender ratio
   */
  scoreGenderRatio(selection, target) {
    let male = 0.0;
    let female = 0.0;
    let other = 0;
    let ratio = 0.0;

    for (let i = 0; i < this.roster.length; i++) {
      if (!selection.genes[i]) {
        // candidate was not selected
        continue;
      }

      const curr_gender = this.roster[i]["gender"];
      if (curr_gender == "M") {
        male++;
      }
      else if (curr_gender == "F") {
       female++; 
      } else {
        other++;
      }
    }
    console.log(`ratio = ${male} / ${female}`);

    // Normalize the gender ratio
    ratio = male / this.roster.length;
    console.log(`Ratio: ${ratio}`);
    const target_male_count = target * this.roster.length;
    const score = Math.abs(target_male_count - male);
    const score_min = 0;
    const score_max = this.roster.length;
    const norm_min = 0.0;
    const norm_max = 1.0;
    const normalized_score = map(score, score_min, score_max, norm_min, norm_max);
    return normalized_score;
  }
}