import './App.css'
import { OrbitControls } from '@react-three/drei'
import { Voxel } from './components/voxel'
import { Canvas } from '@react-three/fiber'
import { Button } from './components/ui/button';
import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function App() {

  const datasets = [
    [-1, 3, 2, 1, 3, 2, -2, 2],
    [-2, -1, -1, 2, 3, 2, 2, 3],
    [-2, -2, 2, 2, -3, 4, -2, 1],
    [2, 2, -2, 1, 3, 2, 1, -2],
    [2, 2, -1, 2, 3, 2, 2, -1],
    [-2, 1, -2, 1, 1, -2, 1, -2],
    [-2, 6, -2, 1, 6, -2, 1, -2],
    [-1, 2, -2, 1, 4, -2, 1, -2],
    [2, 2, -2, 1, 3, -4, 1, -2],
  ];
  const [currData, setCurrData] = useState(8);
  const [currStep, setCurrStep] = useState(0);
  const [c, setC] = useState(0);
  const [index, setIndex] = useState("");

  useEffect(() => {
    buildIndex();
  }, []);

  const steps = [
    "Consider a cell",
    "Classify each vertex as inside or outside",
    "Build an index",
    "Get per-cell triangulation from lookup table",
    "Interpolate edge locations",
    "Compute gradients (optional)",
    "Consider ambiguous cases",
    "Go to next cell"
  ];

  function moveForward() {
    if (currStep === steps.length - 1) {
      setCurrStep(0);
    } else {
      setCurrStep(currStep + 1)
    }
  }

  function buildIndex() {
    let newIndex = "";
    datasets[currData].forEach(v => {
      if (v >= c) {
        newIndex += "1";
      } else {
        newIndex += "0";
      }
    })
    console.log(newIndex)
    setIndex(newIndex);
  }

  return (
    <>
      <div>
        <h1>Marching Cubes</h1>
      </div>
      <div className='flex flex-row'>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an example" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Exercises</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col justify-items-start justify-center w-100'>
          <p><b>Steps:</b></p>
          <ol className='list-decimal list-inside justify-items-start'>
            {steps.map((step, index) => {
              return <li style={{fontWeight: currStep === index ? 'bold' : 'normal' }}>{step}</li>
            })}
          </ol>
          <div className='flex flex-row justify-center p-4'>
            {currStep != steps.length - 1 && <Button variant={"outline"} onClick={moveForward}>
              Next
            </Button>}
            {currStep === steps.length - 1 && <Button variant={"outline"} onClick={moveForward}>
              Next Problem
            </Button>}
          </div>
        </div>
        <div className='w-100 h-100'>
          <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <ambientLight />
            <directionalLight position={[2, 2, 2]} />
            <Voxel data={datasets[currData]} index={index} c={c} step={currStep}/>
            <OrbitControls />
          </Canvas>
        </div>
        <div className='flex flex-col justify-items-start justify-center w-100'>
          {currStep === 1 && <>
            <div className='flex flex-row gap-1 items-center'>
              <Circle fill='green' strokeWidth={0}></Circle>
              <p>= Inside</p>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <Circle fill='blue' strokeWidth={0}></Circle>
              <p>= Outside</p>
            </div>
          </>}
          {currStep === 2 && <>
            <div className='flex flex-row gap-1 items-center'>
              <Circle fill='green' strokeWidth={0}></Circle>
              <p>= Inside = 1</p>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <Circle fill='blue' strokeWidth={0}></Circle>
              <p>= Outside = 0</p>
            </div>
            <p>{index}</p>
          </>}
        </div>
      </div>
      
    </>      
  )
}

export default App
