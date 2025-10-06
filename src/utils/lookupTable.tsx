import type { VoxelEdge, VoxelPoint } from "./types";

export const vertices: Array<VoxelPoint> = [
  { x: -1, y: -1, z: 1 },  // v1
  { x: 1, y: -1, z: 1 },  // v2
  { x: 1, y: 1, z: 1 },  // v3
  { x: -1, y: 1, z: 1 },  // v4
  { x: -1, y: -1, z: -1 },  // v5
  { x: 1, y: -1, z: -1 },  // v6
  { x: 1, y: 1, z: -1 },  // v7
  { x: -1, y: 1, z: -1 },  // v8
];

export const edges: Array<VoxelEdge> = [
  {v1: vertices[0], v2: vertices[1]}, // e1
  {v1: vertices[1], v2: vertices[2]}, // e2
  {v1: vertices[2], v2: vertices[3]}, // e3
  {v1: vertices[3], v2: vertices[0]}, // e4
  {v1: vertices[4], v2: vertices[5]}, // e5
  {v1: vertices[5], v2: vertices[6]}, // e6
  {v1: vertices[6], v2: vertices[7]}, // e7
  {v1: vertices[7], v2: vertices[4]}, // e8
  {v1: vertices[0], v2: vertices[4]}, // e9
  {v1: vertices[1], v2: vertices[5]}, // e10
  {v1: vertices[3], v2: vertices[7]}, // e11
  {v1: vertices[2], v2: vertices[6]}, // e12
];

const cases = [
  [], // case 0
  [
    [ edges[0], edges[3], edges[8] ], // e1, e4, e9
  ], // case 1
  [
    [ edges[1], edges[3], edges[8] ], // e2, e4, e9
    [ edges[1], edges[8], edges[9] ], // e2, e9, e10
  ], // case 2
  [
    [ edges[0], edges[3], edges[8] ], // e1, e4, e9
    [ edges[1], edges[2], edges[11] ], // e2, e3, e11
  ], // case 3
]

export const lookupTable: { [id: string]: Array<Array<Array<VoxelEdge>>> } = {
  "00000000": [],
  "01111101": [[
    [ edges[0], edges[3], edges[8] ], // e1, e4, e9
    [ edges[5], edges[6], edges[11] ], // e6, e7, e12
  ]],
  "00011111": [[
    [ edges[2], edges[3], edges[8] ], // e3, e4, e9
    [ edges[2], edges[8], edges[9] ], // e3, e9, e10
    [ edges[2], edges[9], edges[11] ], // e3, e10, e12
  ]],
  "00110101": [[
    [ edges[1], edges[3], edges[7] ], // e2, e4, e8
    [ edges[1], edges[4], edges[7] ], // e2, e5, e8
    [ edges[1], edges[4], edges[9] ], // e2, e5, e10
    [ edges[5], edges[6], edges[11] ], // e6, e7, e12
  ]],
  "11011110": [
    [
      [ edges[1], edges[2], edges[11] ], // e2, e3, e12
      [ edges[6], edges[7], edges[10] ], // e7, e8, e11
    ],
    [
      [ edges[1], edges[2], edges[11] ], // e2, e3, e12
      [ edges[6], edges[7], edges[10] ], // e7, e8, e11
      [ edges[2], edges[10], edges[11] ], // e3, e11, e12
      [ edges[6], edges[10], edges[11] ], // e7, e11, e12
    ],
  ],
  "01011010": [
    [
      [ edges[0], edges[1], edges[9] ], // e1, e2, e10
      [ edges[2], edges[3], edges[10] ], // e3, e4, e11
      [ edges[4], edges[7], edges[8] ], // e5, e8, e9
      [ edges[5], edges[6], edges[11] ], // e6, e7, e12
    ],
    [
      [ edges[0], edges[3], edges[8] ], // e1, e4, e9
      [ edges[4], edges[5], edges[9] ], // e5, e6, e10
      [ edges[1], edges[2], edges[11] ], // e2, e3, e12
      [ edges[6], edges[7], edges[10] ], // e7, e8, e11
      [ edges[2], edges[10], edges[11] ], // e3, e11, e12
      [ edges[6], edges[10], edges[11] ], // e7, e11, e12
    ],
    [
      [ edges[0], edges[3], edges[8] ], // e1, e4, e9
      [ edges[4], edges[5], edges[9] ], // e5, e6, e10
      [ edges[1], edges[2], edges[11] ], // e2, e3, e12
      [ edges[6], edges[7], edges[10] ], // e7, e8, e11
      [ edges[2], edges[10], edges[11] ], // e3, e11, e12
      [ edges[6], edges[10], edges[11] ], // e7, e11, e12
      [ edges[1], edges[9], edges[11] ], // e2, e10, e12
      [ edges[5], edges[9], edges[11] ], // e6, e10, e12
    ],
  ],
  "11011010": [
    [
      [ edges[5], edges[6], edges[11] ], // e6, e7, e12
      [ edges[2], edges[7], edges[10] ], // e3, e8, e11
      [ edges[1], edges[2], edges[7] ], // e2, e3, e8
      [ edges[1], edges[4], edges[7] ], // e2, e5, e8
      [ edges[1], edges[4], edges[9] ], // e2, e5, e10

    ],
  ]
}