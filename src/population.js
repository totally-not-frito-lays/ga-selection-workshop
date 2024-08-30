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
    selection.gender_count["M"] = 0;
    selection.gender_count["F"] = 0;
    selection.gender_count["O"] = 0;

    let ratio = 0.0;

    for (let i = 0; i < this.roster.length; i++) {
      if (!selection.genes[i]) {
        // candidate was not selected
        continue;
      }

      const curr_gender = this.roster[i]["gender"];
      if (curr_gender == "M") {
        selection.gender_count["M"]++;
      }
      else if (curr_gender == "F") {
        selection.gender_count["F"]++; 
      } else {
        selection.gender_count["O"]++;
      }
    }
    
    // Normalize the gender ratio
    ratio = selection.gender_count["M"] / selection.selected_size;
    // console.log(`ratio = ${male} / ${selection.selected_size} = ${ratio}`);
    const target_male_count = target * selection.selected_size;
    const score = Math.abs(target_male_count - selection.gender_count["M"]);
    // console.log(`difference = ${target_male_count} - ${male} = ${score}`)
    const score_min = 0;
    const score_max = this.roster.length;
    const norm_min = 0.0;
    const norm_max = 1.0;
    // We reverse the norm_max and norm_min because we want to incentize having
    // a smaller difference between the target and the actual male count
    const normalized_score = map(score, score_min, score_max, norm_max, norm_min);
    // console.log(`normalized_score = ${normalized_score}`);
    return normalized_score;
  }
}