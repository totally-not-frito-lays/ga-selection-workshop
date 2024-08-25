# README.md

## About

This project was built with the intention of being used as a workshop to teach
at different levels. It tackles the following topics
- AI and ML
- Evolution
- Bias in selection
- Randomness

## Creating a new P5 Project

Create the vite boilerplate

```bash
npm create vite@latest
cd <working-dir>
npm insatll
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
