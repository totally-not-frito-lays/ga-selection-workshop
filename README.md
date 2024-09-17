# README.md

## About

This project was built with the intention of being used as a workshop to teach
at different levels. It tackles the following topics
- AI and ML
- Evolution
- Bias in selection
- Randomness

Soft topics that it can tackle:
- Fairness (if we were to model adversarial team formation instead)
- Fairness in terms of discriminatory factors
  - ie. if we try affirmative action

## Running the project

Create the vite boilerplate

```bash
npm create vite@latest
cd <working-dir>
npm install
npm run dev
```

Run the project in the browser at `http://localhost:5173/`

```bash
npm run dev
```

Create the p5 boilerplate

1. `cmd/ctrl + shift + p` 
2. "create p5 project"
   1. this should create a new minified library folder in the directory
3. ensure that `index.html` has the following
   1. `script:src "p5 libs"`
   2. `script:src "sketch.js"`
   3. `body>main`

## To-Do

This project isn't done yet! There's still much to do. Since I started this 
project on the plane, here's an offline list of what I have left to do:

- [x] Create a visualization of the different candidates in the sample pool
  - [x] Generate a random vector of candidates with different features (ie. gender)
- [ ] Handle different kinds of features
  - [x] Gender
- [ ] Create a visualization of the different GA entities `<--- currently working on this`
  - [ ] Create an animation of the different GA entities selecting their 
   candidates one at a time
  - [ ] Create an animation of the GA selections that are approved to enter the
         mating pool / continue to the next generation
  - [ ] Create a visualization that displays the fitness score of each selection group
  - [ ] Animate the crossover phase
  - [ ] Animate the mutation phase
  - [ ] After [x] generations, visualize which selection array was the optimal
         balance of all the selected
- [x] Write a population class to handle candidate generation and fitness
  - [x] Write a fitness function to score gender
- [x] Write a DNA class to handle the selection generation
  - [x] Write a crossover function to handle heredity
  - [x] Write a mutation function to introduce variance
  - [x] Use the natural selection process to generate more generations
  - [ ] Implement various selection strategies:
    - [ ] Impelment midpoint
    - [ ] Implement random midpoint
    - [x] Implement flipped coin
- [ ] make sure you have a biased applicant pool, then create an unbiased selection
- [ ] prioritize what the current generation is and who gets kept