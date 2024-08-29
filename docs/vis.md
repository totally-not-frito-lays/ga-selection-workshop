# Visualization

When designing a visual system, it helps to plan out what it'll look like. In
this case we want to have the following:
- Current candidate pool
  - The stats of each candidate at a high level view
  - Be able to change which feature is displayed for each index
- Current selection with the highest combined fitness
  - Genotype: Which candidates are selected
  - Animate the selection process as a decision is made for each candidate
  - After all the selection is done, the GA selection is done to determine
    which selection groups were satisfactory, then has a colored fade in 
    transition with the fitness score of the selection group
  - Then the crossover is animated
  - Then the mutation is animated
  - The crossover and the mutation loops until we get a selection that meets the
    score threshold