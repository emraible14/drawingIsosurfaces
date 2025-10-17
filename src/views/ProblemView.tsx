import { OrbitControls } from '@react-three/drei'
import { Voxel } from '../components/voxel'
import { Canvas } from '@react-three/fiber'
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import { ArrowRight, Circle } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { defaultDatasets, lookupTable } from '@/utils/data';

function ProblemView() {

  const datasets = [
    [-1, 3, 2, 1, 3, 2, -2, 2],
    [-2, -1, -1, 2, 3, 2, 2, 3],
    [2, 2, -1, 2, 3, 2, 2, -1],
    [2, 2, -2, 1, 3, 2, 1, -2],
    [2, -3, 2, -2, -3, -4, 2, 1],
    [2, -2, 2, -2, -3, -4, 2, 1],
    // [-2, 1, -2, 1, 1, -2, 1, -2],
    // [-2, 6, -2, 1, 6, -2, 1, -2],
    // [-1, 2, -2, 1, 4, -2, 1, -2],
    // [2, 2, -2, 1, 3, -4, 1, -2],
    [2, -2, -2, 1, 3, 4, 1, -2],
  ];

  const cases = [4, 5, 3, 3, 12, 12, 6]; // hardcoded for now, ideally would determine this algorithmically
  
  const c = 0;

  const [currData, setCurrData] = useState(0);
  const [currStep, setCurrStep] = useState(0);
  const [index, setIndex] = useState("");
  const [defaultIndex, setDefaultIndex] = useState("");
  
  useEffect(() => {
    const newIndex = buildIndex(datasets[currData]);
    setIndex(newIndex);

    const newDefault = buildIndex(defaultDatasets[cases[currData]]);
    setDefaultIndex(newDefault);
  }, [currData]);

  const steps = [
    "Consider a cell",
    "Classify each vertex as inside or outside",
    "Build an index",
    "Get per-cell triangulation from lookup table",
    "Interpolate edge locations",
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

  function moveBackward() {
    if (currStep === 0) {
      setCurrStep(steps.length - 1);
    } else {
      setCurrStep(currStep - 1)
    }
  }

  function buildIndex(data: Array<number>) {
    let newIndex = "";
    data.forEach(v => {
      if (v < c) {
        newIndex += "1";
      } else {
        newIndex += "0";
      }
    })
    console.log(newIndex)
    return newIndex;
  }

  function isAmbiguous(i: string) {
    return lookupTable[i].length > 1;
  }
  
  return (
    <>
      <div className='flex flex-row'>
        <div className='flex flex-col items-center justify-center w-100 gap-2'>
          <p><b>Steps:</b></p>
          <div className='w-full justify-start'>
            <ol className='list-decimal list-inside justify-items-start'>
              {steps.map((step, index) => {
                return <li style={{fontWeight: currStep === index ? 'bold' : 'normal' }}>{step}</li>
              })}
            </ol>
          </div>
          <div className='flex flex-row justify-center p-2'>
            {currStep != steps.length - 1 && 
              <>
                {currStep !== 0 && <Button className="m-2" variant={"outline"} onClick={moveBackward}>
                  Back
                </Button>}
                <Button className="m-2" variant={"outline"} onClick={moveForward}>
                  Next
                </Button>
              </>
            }
            {currStep === steps.length - 1 && <Button className="m-2" variant={"outline"} onClick={() => {
              const nextData = currData === datasets.length - 1 ? 0 : currData + 1;
              setCurrData(nextData);
              moveForward();
            }}>
              Next Problem
            </Button>}
          </div>
          <Select value={currData.toString()} onValueChange={(item) => {
              setCurrStep(0);
              setCurrData(+item);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Example" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Exercises</SelectLabel>
                {Array.from({ length: datasets.length }).map((_, index) => (
                  <SelectItem value={index.toString()}>Example {index + 1}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='w-100 h-100'>
          <Canvas camera={{ position: [4, 3.5, 5], fov: 50 }}>
            <ambientLight />
            <directionalLight position={[2, 2, 2]} />
            <Voxel data={datasets[currData]} c={c} step={currStep} index={index}/>
            <OrbitControls />
          </Canvas>
        </div>
        <div className='flex flex-col justify-items-start justify-center w-100'>
          {currStep === 1 && <>
            <div className='flex flex-row gap-1 items-center'>
              <Circle fill='green' strokeWidth={0}></Circle>
              <p>Inside: value {'<'}= c</p>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <Circle fill='blue' strokeWidth={0}></Circle>
              <p>Outside: value {'>'} c</p>
            </div>
          </>}
          {currStep === 2 && <div className='flex flex-row justify-start gap-10 items-center'>
            <div className='flex flex-col'>
              <div className='flex flex-row gap-1 items-center'>
                <Circle fill='green' strokeWidth={0}></Circle>
                <p>Inside = 1</p>
              </div>
              <div className='flex flex-row gap-1 items-center'>
                <Circle fill='blue' strokeWidth={0}></Circle>
                <p>Outside = 0</p>
              </div>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <ArrowRight></ArrowRight>
              <p> Index = {index}</p>
            </div>
          </div>}
          {currStep === 3 && <div className='flex flex-col justify-start items-center'>
            <div>
              <p>Lookup table result: Case {cases[currData]} {index !== defaultIndex ? 'rotated' : ''}</p>
            </div>
            <div className='w-50 h-50'>
             <Canvas camera={{ position: [4, 3.5, 5], fov: 30 }}>
                <ambientLight />
                <directionalLight position={[2, 2, 2]} />
                <Voxel data={defaultDatasets[cases[currData]]} c={c} step={8} index={defaultIndex} decider={0}/>
                <OrbitControls />
              </Canvas>
            </div>
          </div>}
          {currStep === 5 && <div className='flex flex-col justify-start gap-10 items-center'>
            <div>
              {!isAmbiguous(index) && <p>No ambiguities for Case {cases[currData]}</p>}
              {isAmbiguous(index) && (
                <div className='flex flex-col items-center'>
                  <p className='text-s'>Consider {lookupTable[index].length} ambiguous cases.</p>
                  <p className='text-xs'>Ambiguities are resolved by looking at each ambiguous face, calculating the saddle point, then determining
                     if the face should be "separated" or "not separated". The correct triangulation on the left is then selected 
                    from the lookup table. All possible triangulations are shown below.
                  </p>
                  <Carousel className="w-50">
                    <CarouselContent>
                      {Array.from({ length: lookupTable[index].length }).map((_, i) => (
                        <CarouselItem key={i}>
                          <div className='w-50 h-50 justify-center'>
                            <Canvas camera={{ position: [4, 3.5, 5], fov: 30 }}>
                              <ambientLight />
                              <directionalLight position={[2, 2, 2]} />
                              <Voxel data={datasets[currData]} c={c} step={currStep} index={index} decider={i}/>
                              <OrbitControls />
                            </Canvas>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )}
            </div>
          </div>}
        </div>
      </div>
    </>      
  )
}

export default ProblemView