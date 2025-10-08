import './App.css'

import ProblemView from './views/ProblemView';

import { Canvas } from '@react-three/fiber';
import { MarchingCube } from './components/marching-cube';
import { OrbitControls } from '@react-three/drei';

function App() {

  const numCubes = 8;
  const stepOffset = 10 / numCubes; // spacing in seconds between each cube’s start
  const cubeOffsets = Array.from({ length: numCubes }, (_, i) => i * stepOffset);

  return (
    <>
      <div className='flex flex-row justify-around'>
        <Canvas
          camera={{ position: [0, 5, 10], fov: 30 }}
          style={{ width: "230px", height: "100px", background: "#ffffff" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          {cubeOffsets.map((offset, i) => (
            <MarchingCube key={i} offset={offset} />
          ))}
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div>
        <h1>Marching Cubes</h1>
      </div>
      <div className='flex flex-row justify-around m-2'>
        <p>Assume an Isovalue c = 0. Click through the following examples to see how an isosurface would be extracted using the Marching Cubes algorithm.</p>
      </div>
      <ProblemView></ProblemView>
      <div className='m-10'>
          <p>Website built using <a href='https://vite.dev/guide/'>React Vite Typescript</a>, 
            with <a href="https://ui.shadcn.com/">shadcn</a> components 
            and <a href='https://threejs.org/'>Three.js </a>
            and <a href='https://r3f.docs.pmnd.rs/getting-started/introduction'>React Three Fiber </a> 
            for graphics rendering. Algorithm information pulled from Tino 
             Weinkauf's <a href='https://www.csc.kth.se/~weinkauf/teaching/visualization/index.html?module=5'>
             Geometry-based scalar field visualization</a> lecture 
             and <a href='https://people.eecs.berkeley.edu/~jrs/meshpapers/NielsonHamann.pdf'>“The Asymptotic Decider”</a>, Nielson and Hamann, 
             IEEE Vis 1991. AI disclosure: ChatGPT was used to help generate the animation for the marching cubes heading.</p>
      </div>
    </>      
  )
}

export default App
