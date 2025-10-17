# Marching Cubes - A learning tool

This small project is meant to create an interactive learning tool for understanding how the Marching Cubes algorithm works to draw isosurfaces. Please note that due to time constraints this project does not cover all cases, and may not account for further improvements made to the algorithm after Nielson and Hamann.

To run the project locally, you must have node v20+ and npm v10+ installed. Use the following commands to install packages and run locally:

```
npm install
npm run dev
```

Site was built using [React Vite Typescript](https://vite.dev/guide/), with [shadcn](https://ui.shadcn.com/) components and [Three.js](https://threejs.org/) and [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) for graphics rendering. Algorithm information pulled from Tino Weinkauf's [Geometry-based scalar field visualization](https://www.csc.kth.se/~weinkauf/teaching/visualization/index.html?module=5) lecture and [“The Asymptotic Decider”](https://people.eecs.berkeley.edu/~jrs/meshpapers/NielsonHamann.pdf), Nielson and Hamann, IEEE Vis 1991. 

AI disclosure: ChatGPT was used to help generate the animation for the marching cubes heading.

