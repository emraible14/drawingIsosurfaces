
import { Edges, Html } from "@react-three/drei";
import type { IsoPoint, VoxelEdge, VoxelPoint } from "../utils/types";
import { faces, lookupTable, vertices } from "../utils/lookupTable";
import * as THREE from "three";
import { useEffect, useState } from "react";

interface VoxelProps {
  data: number[];
  c: number;
  step: number;
  index: string;
  decider?: number;
}

export function Voxel(props: VoxelProps) {

  const [isoPoints, setIsoPoints] = useState<Array<IsoPoint>>([]); // where the points fall on the voxel edges
  const [isoTriangleOptions, setIsoTriangleOptions] = useState<Array<Array<Array<VoxelPoint>>>>([]); // the 3 point combinations of the final triangular meshes
  const [decidedTriangles, setDecidedTriangles] = useState<Array<Array<VoxelPoint>>>([]); // the 3 point combinations of the final triangular meshes

  useEffect(() => {
    getPoints();
  }, [props.data, props.index, props.c])


  useEffect(() => {
    getDecider();
  }, [isoTriangleOptions, isoPoints])

  function getColor(index: number) {
    if (props.step === 0) return "gray";
    return props.data[index] <= props.c ? "green" : "blue"
  }

  function getPoints() {
    const triangleEdgeOptions = lookupTable[props.index];

    const isoTriangleOpts: Array<Array<Array<VoxelPoint>>> = [];

    if (triangleEdgeOptions && triangleEdgeOptions.length > 0) {
      const points: Array<IsoPoint> = [];
      
      // go through each triangle for default case (case 0)
      // const triangleEdges = triangleEdgeOptions[0];

      // go through each option available in lookup table
      triangleEdgeOptions.forEach((triangleEdges) => {
        const currIsoTriangles: Array<Array<VoxelPoint>> = [];

        triangleEdges.forEach((tri) => {
          // go through each edge and interpolate to find point
          const resultTri: Array<VoxelPoint> = [];
          tri.forEach((edge: VoxelEdge) => {
            const val1 = props.data[vertices.findIndex((v) => v === edge.v1)]
            const val2 = props.data[vertices.findIndex((v) => v === edge.v2)]
            const t = (props.c - val1) / (val2 - val1);
            const newPoint = {
              point: { 
                x: (1 - t) * edge.v1.x + t * edge.v2.x,
                y: (1 - t) * edge.v1.y + t * edge.v2.y,
                z: (1 - t) * edge.v1.z + t * edge.v2.z,
              },
              edge: edge,
            }
            // add isoPoint if we haven't already
            const foundPoint = points.find((p) => p.point.x === newPoint.point.x && p.point.y === newPoint.point.y && p.point.z === newPoint.point.z);
            if (!foundPoint) points.push(newPoint);
            // add vertext to current triange
            resultTri.push(newPoint.point);
          });
          currIsoTriangles.push(resultTri);
        });
        isoTriangleOpts.push(currIsoTriangles);
      })
      
      setIsoPoints(points);
      setIsoTriangleOptions(isoTriangleOpts);
    } else {
      console.log("index not found")
    }
  }

  function getDecider() {
    if (props.decider !== undefined) {
      setDecidedTriangles(isoTriangleOptions[props.decider]);
      return;
    }
    if (isoTriangleOptions.length === 0) return;
    if (isoTriangleOptions.length === 1) {
      setDecidedTriangles(isoTriangleOptions[0]);
      return;
    }

    // start with all options
    let remainingOptions = [...isoTriangleOptions];

    // go through each face and see if it has ambiguities
    faces.forEach((face) => {
      const relevantPoints = isoPoints.filter((p) => p.edge.index === face.e1.index || p.edge.index === face.e2.index || p.edge.index === face.e3.index || p.edge.index === face.e4.index);

      if (relevantPoints.length === 4) {
        // calculate saddle value
        const f00 = props.data[vertices.findIndex((v) => v === face.v1)];
        const f10 = props.data[vertices.findIndex((v) => v === face.v2)];
        const f11 = props.data[vertices.findIndex((v) => v === face.v3)];
        const f01 = props.data[vertices.findIndex((v) => v === face.v4)];

        const saddle = (f00 * f11 - f10 * f01) / (f00 + f11 - f01 - f10);

        const iso1 = relevantPoints.find((iso) => iso.edge.index === face.e1.index);
        const iso2 = relevantPoints.find((iso) => iso.edge.index === face.e2.index);
        const iso3 = relevantPoints.find((iso) => iso.edge.index === face.e3.index);
        const iso4 = relevantPoints.find((iso) => iso.edge.index === face.e4.index);

        const requiredPair: Array<IsoPoint> = []; // only need to check for one pair really
        if (props.c > saddle) {
          // connection between iso1 and iso4
          requiredPair.push(iso1);
          requiredPair.push(iso4);
        } else {
          // connection between iso1 and iso2
          requiredPair.push(iso1);
          requiredPair.push(iso2);
        }
        // filter options to only those that include the required pair
        remainingOptions = remainingOptions.filter((opt) => {
          let requiredPairFound = false;
          opt.forEach(tri => {
            const foundPair1 = tri.find((p: VoxelPoint) => p.x === requiredPair[0].point.x && p.y === requiredPair[0].point.y && p.z === requiredPair[0].point.z);
            const foundPair2 = tri.find((p: VoxelPoint) => p.x === requiredPair[1].point.x && p.y === requiredPair[1].point.y && p.z === requiredPair[1].point.z);
            if (foundPair1 && foundPair2) requiredPairFound = true;
          })
          return requiredPairFound;
        });
      }
    });
    setDecidedTriangles(remainingOptions[0]);
  }

  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="skyblue" transparent opacity={0.1} />
        <Edges color="black" />
      </mesh>
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
      {props.step >= 4 && isoPoints.map((iso: IsoPoint, i: number) => (
        <Html
          key={i}
          position={[iso.point.x, iso.point.y, iso.point.z]}
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
      {props.step >= 5 && decidedTriangles && decidedTriangles.length > 0 && decidedTriangles.map((isoTri, i) => {
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
            <Edges color="black" />
          </mesh>
        );
      })}
    </group>
  );

}