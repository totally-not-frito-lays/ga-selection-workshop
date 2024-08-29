# Genetic Algorithm Introduction

## Designing a GA

| GA Term           | Implementation                                              |
| ---               | ----------------------------------------------------------- |
| DNA Genotype      | Vector of 100 entities that are selected                    |
| DNA Phenotype     | Each individual entity is scored differently in the matrix  |
| Fitness Function  | F(x) = w_1 * dist_from_target_ratio                         |
| Selection Style   | Probability model                                           |
| Crossover         | Combination: Coinflipping?                                  |
| Mutation Rate     | 1%                                                          |

Population
- Generate Population
- Selection
- Mating Pool

DNA
- Crossover
- Mutation
- Fitness

Fitness Function
- Gender Ratio
  - ex:
    - average case: `50 male : 50 female = 1.0 ratio`
    - upper edge case:   `100 male : 0 female = 100 ratio`
    - lower edge case:   `0 female : 100 male = 0 ratio`
  - fitness function:
    - ex:
      - best case:  `target = 1.0; actual = 1.0; target - actual = 0`
      - upper edge case:  `target = 1.0; actual = 100; target - actual = -100`
      - lower edge case:  `target = 1.0; actual = 0; target - actual = 1`
    - both the edge cases should be considered equally far
    - it'll be easiest to evaluate the ratio based on the number of males and 
    ensuring that the number of males does not exceed half
  - fitness function:
    - `fitness = size / 2 - male`
    - `normalFitness = map(fitness, 0, size, 0, 100) / 100;`
    - ex:
      - best case:        `target = 50; actual = 50;    abs(target - actual) = 0`
      - upper edge case:  `target = 50; actual = 100;   abs(target - actual) = 50`
      - lower edge case:  `target = 50; actual = 0;     abs(target - actual) = 50`
      - best case:        `target = 25; actual = 50;    abs(target - actual) = 25`
      - upper edge case:  `target = 25; actual = 100;   abs(target - actual) = 75`
      - lower edge case:  `target = 25; actual = 0;     abs(target - actual) = 50`

Genetic algorithms are okay at solving for single variable optimizations, but 
they shine in multi-variable optimization problems and problems that don't have
a well-defined problem space.