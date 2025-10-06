
import { Edges, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import type { VoxelEdge, VoxelPoint } from "../utils/types";
import { lookupTable, vertices } from "../utils/lookupTable";
import * as THREE from "three";

interface VoxelProps {
  data: number[];
  c: number;
  step: number;
  index: string;
}

export function Voxel(props: VoxelProps) {

  const [isoPoints, setIsoPoints] = useState<Array<VoxelPoint>>([])
  const [isoTriangles, setIsoTriangles] = useState<Array<Array<VoxelPoint>>>([])



  function getPoints() {
    const triangleEdgeOptions = lookupTable[props.index];

    if (triangleEdgeOptions && triangleEdgeOptions.length > 0) {
      const points: Array<VoxelPoint> = [];
      const isoTriangles: Array<Array<VoxelPoint>> = [];
      // go through each triangle
      const triangleEdges = triangleEdgeOptions[triangleEdgeOptions.length - 1];
      triangleEdges.forEach((tri) => {
        // go through each edge and interpolate to find point
        console.log(tri);
        const currTriangle: Array<VoxelPoint> = [];
        tri.forEach((edge: VoxelEdge) => {

          const val1 = props.data[vertices.findIndex((v) => v === edge.v1)]
          console.log(val1)
          const val2 = props.data[vertices.findIndex((v) => v === edge.v2)]
          console.log(val2)
          const t = (props.c - val1) / (val2 - val1);
          console.log(t)
          const newVertex = { 
            x: (1 - t) * edge.v1.x + t * edge.v2.x,
            y: (1 - t) * edge.v1.y + t * edge.v2.y,
            z: (1 - t) * edge.v1.z + t * edge.v2.z,
          }
          points.push(newVertex);
          currTriangle.push(newVertex);
        });
        isoTriangles.push(currTriangle);
        console.log(points);
        console.log(currTriangle);

      });
      setIsoPoints(points);
      setIsoTriangles(isoTriangles);
    } else {
      console.log("index not found")
    }
  }

  useEffect(() => {
    getPoints();
  }, []);

  function getColor(index: number) {
    if (props.step === 0) return "gray";
    return props.data[index] >= props.c ? "green" : "blue"
  }

  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="skyblue" transparent opacity={0.1} />
        <Edges color="black" />
      </mesh>
      {/* <mesh>
        <shapeGeometry />
        <meshBasicMaterial color="red" transparent opacity={0.1} />
        <Edges color="black" />
      </mesh> */}
      {vertices.map((vertex: VoxelPoint, i: number) => (
        <Html
          key={i}
          position={[vertex.x, vertex.y, vertex.z]}
          style={{
            background: getColor(i),
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            color: "white"
          }}
          center
        >
          {`${props.data[i]}`}
        </Html>
      ))}
      {props.step >= 4 && isoPoints.map((vertex: VoxelPoint, i: number) => (
        <Html
          key={i}
          position={[vertex.x, vertex.y, vertex.z]}
          style={{
            background: "red",
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            color: "white"
          }}
          center
        >
          {`${props.c}`}
        </Html>
      ))}
      {props.step >= 6 && isoTriangles.length > 0 && isoTriangles.map((isoTri, i) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(isoTri.flatMap(p => [p.x, p.y, p.z]));
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.computeVertexNormals();
    
        return (
          <mesh key={i} geometry={geometry}>
            <meshBasicMaterial
              color="red"
              side={THREE.DoubleSide}
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );

}