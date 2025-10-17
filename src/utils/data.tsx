import type { VoxelEdge, VoxelFace, VoxelPoint } from "./types";

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
  {v1: vertices[0], v2: vertices[1], index: '1'}, // e1
  {v1: vertices[1], v2: vertices[2], index: '2'}, // e2
  {v1: vertices[2], v2: vertices[3], index: '3'}, // e3
  {v1: vertices[3], v2: vertices[0], index: '4'}, // e4
  {v1: vertices[4], v2: vertices[5], index: '5'}, // e5
  {v1: vertices[5], v2: vertices[6], index: '6'}, // e6
  {v1: vertices[6], v2: vertices[7], index: '7'}, // e7
  {v1: vertices[7], v2: vertices[4], index: '8'}, // e8
  {v1: vertices[0], v2: vertices[4], index: '9'}, // e9
  {v1: vertices[1], v2: vertices[5], index: '10'}, // e10
  {v1: vertices[3], v2: vertices[7], index: '11'}, // e11
  {v1: vertices[2], v2: vertices[6], index: '12'}, // e12
];

export const faces: Array<VoxelFace> = [
  { 
    e1: edges[0], // e1
    e2: edges[1], // e2
    e3: edges[2], // e3
    e4: edges[3], // e4
    v1: vertices[0],
    v2: vertices[1],
    v3: vertices[2],
    v4: vertices[3],
  },
  { 
    e1: edges[4], // e5
    e2: edges[5], // e6
    e3: edges[6], // e7
    e4: edges[7], // e8
    v1: vertices[4],
    v2: vertices[5],
    v3: vertices[6],
    v4: vertices[7],
  },
  { 
    e1: edges[0], // e1
    e2: edges[9], // e10
    e3: edges[4], // e5
    e4: edges[8], // e9
    v1: vertices[0],
    v2: vertices[1],
    v3: vertices[5],
    v4: vertices[5],
  },
  { 
    e1: edges[1], // e2
    e2: edges[9], // e10
    e3: edges[5], // e6
    e4: edges[11], // e12
    v1: vertices[1],
    v2: vertices[5],
    v3: vertices[6],
    v4: vertices[2],
  },
  { 
    e1: edges[2], // e3
    e2: edges[11], // e12
    e3: edges[6], // e7
    e4: edges[10], // e11
    v1: vertices[3],
    v2: vertices[2],
    v3: vertices[6],
    v4: vertices[7],
  },
  { 
    e1: edges[8], // e9
    e2: edges[7], // e8
    e3: edges[10], // e11
    e4: edges[3], // e4
    v1: vertices[0],
    v2: vertices[4],
    v3: vertices[7],
    v4: vertices[3],
  },
];

export const defaultDatasets = [
  [1, 1, 1, 1, 1, 1, 1, 1], // case 0
  [-1, 1, 1, 1, 1, 1, 1, 1], // case 1
  [-1, -1, 1, 1, 1, 1, 1, 1], // case 2
  [-1, 1, -1, 1, 1, 1, 1, 1], // case 3
  [-1, 1, 1, 1, 1, 1, -1, 1], // case 4
  [1, -1, 1, 1, -1, -1, 1, 1], // case 5
  [-1, -1, 1, 1, 1, 1, -1, 1], // case 6
  [1, -1, 1, -1, 1, 1, -1, 1], // case 7
  [-1, -1, 1, 1, -1, -1, 1, 1], // case 8
  [-1, 1, 1, 1, -1, -1, 1, -1], // case 9
  [-1, 1, 1, -1, 1, -1, -1, 1], // case 10
  [-1, 1, 1, 1, -1, -1, -1, 1], // case 11
  [1, -1, 1, -1, -1, -1, 1, 1], // case 12
  [-1, 1, -1, 1, 1, -1, 1, -1], // case 13
  [1, -1, 1, 1, -1, -1, 1, -1], // case 14
];

const defaultCases = [
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
    [ edges[1], edges[2], edges[11] ], // e2, e3, e12
  ], // case 3
  [
    [ edges[0], edges[3], edges[8] ], // e1, e4, e9
    [ edges[5], edges[6], edges[11] ], // e6, e7, e12
  ], // case 4
  [
    [ edges[0], edges[1], edges[8] ], // e1, e2, e9
    [ edges[1], edges[7], edges[8] ], // e2, e8, e9
    [ edges[1], edges[5], edges[7] ], // e2, e6, e8
  ], // case 5
  [
    [ edges[1], edges[3], edges[8] ], // e2, e4, e9
    [ edges[1], edges[8], edges[9] ], // e2, e9, e10
    [ edges[5], edges[6], edges[11] ], // e6, e7, e12
  ], // case 6
  [
    [ edges[0], edges[1], edges[9] ], // e1, e2, e10
    [ edges[2], edges[3], edges[10] ], // e3, e4, e11
    [ edges[5], edges[6], edges[11] ], // e6, e7, e12
  ], // case 7
  [
    [ edges[1], edges[3], edges[5] ], // e2, e4, e6
    [ edges[3], edges[5], edges[7] ], // e4, e6, e8
  ], // case 8
  [
    [ edges[0], edges[5], edges[9] ], // e1, e6, e10
    [ edges[0], edges[5], edges[6] ], // e1, e6, e7
    [ edges[0], edges[3], edges[6] ], // e1, e4, e7
    [ edges[3], edges[6], edges[10] ], // e4, e7, e11
  ], // case 9
  [
    [ edges[0], edges[2], edges[8] ], // e1, e3, e9
    [ edges[2], edges[8], edges[10] ], // e3, e9, e11
    [ edges[4], edges[9], edges[11] ], // e5, e10, e12
    [ edges[4], edges[6], edges[11] ], // e5, e7, e12
  ], // case 10
  [
    [ edges[0], edges[3], edges[7] ], // e1, e4, e8
    [ edges[0], edges[7], edges[11] ], // e1, e8, e12
    [ edges[0], edges[9], edges[11] ], // e1, e10, e12
    [ edges[6], edges[7], edges[11] ], // e7, e8, e12
  ], // case 11
  [
    [ edges[0], edges[1], edges[8] ], // e1, e2, e9
    [ edges[1], edges[7], edges[8] ], // e2, e8, e9
    [ edges[1], edges[5], edges[7] ], // e2, e6, e8
    [ edges[2], edges[3], edges[10] ], // e3, e4, e11
  ], // case 12
  [
    [ edges[0], edges[3], edges[8] ], // e1, e4, e9
    [ edges[1], edges[2], edges[11] ], // e2, e3, e12
    [ edges[4], edges[5], edges[9] ], // e5, e6, e10
    [ edges[6], edges[7], edges[10] ], // e7, e8, e11
  ], // case 13
  [
    [ edges[0], edges[8], edges[10] ], // e1, e9, e11
    [ edges[0], edges[5], edges[10] ], // e1, e6, e11
    [ edges[0], edges[1], edges[5] ], // e1, e2, e6
    [ edges[5], edges[6], edges[10] ], // e6, e7, e11
  ], // case 14
]

export const lookupTable: { [id: string]: Array<Array<Array<VoxelEdge>>> } = {
  "00000000": [defaultCases[0]],
  "10000000": [defaultCases[1]],
  "11000000": [defaultCases[2]],
  "10100000": [defaultCases[3]],
  "10000010": [defaultCases[4]],
  "01001100": [defaultCases[5]],
  "11000010": [defaultCases[6]],
  "01010010": [defaultCases[7]],
  "11001100": [defaultCases[8]],
  "10001101": [defaultCases[9]],
  "10010110": [defaultCases[10]],
  "10001110": [defaultCases[11]],
  "01001101": [defaultCases[14]],
  "11100000": [[
    [ edges[2], edges[3], edges[8] ], // e3, e4, e9
    [ edges[2], edges[8], edges[9] ], // e3, e9, e10
    [ edges[2], edges[9], edges[11] ], // e3, e10, e12
  ]],
  "01011100": [
    defaultCases[12],
    [
      [ edges[0], edges[3], edges[10] ], // e1, e4, e11
      [ edges[5], edges[7], edges[8] ], // e6, e8, e9
      [ edges[0], edges[5], edges[8] ], // e1, e6, e9
      [ edges[0], edges[5], edges[10] ], // e1, e6, e11
      [ edges[2], edges[5], edges[10] ], // e3, e6, e11
      [ edges[1], edges[2], edges[5] ], // e2, e3, e6
    ],
    [
      [ edges[0], edges[3], edges[8] ], // e1, e4, e9
      [ edges[2], edges[7], edges[10] ], // e3, e8, e11
      [ edges[2], edges[5], edges[7] ], // e3, e6, e8
      [ edges[1], edges[2], edges[5] ], // e2, e3, e6
    ],
    [
      [ edges[2], edges[3], edges[8] ], // e3, e4, e9
      [ edges[5], edges[7], edges[10] ], // e6, e8, e11
      [ edges[2], edges[5], edges[10] ], // e3, e6, e11
      [ edges[2], edges[5], edges[8] ], // e3, e6, e9
      [ edges[0], edges[5], edges[8] ], // e1, e6, e9
      [ edges[0], edges[1], edges[5] ], // e1, e2, e6
    ],
  ],
  "00100001": [
    [
      [ edges[1], edges[2], edges[11] ], // e2, e3, e12
      [ edges[6], edges[7], edges[10] ], // e7, e8, e11
    ],
    [
      [ edges[1], edges[2], edges[7] ], // e2, e3, e8
      [ edges[2], edges[7], edges[10] ], // e3, e8, e11
      [ edges[1], edges[7], edges[11] ], // e2, e8, e12
      [ edges[6], edges[7], edges[11] ], // e7, e8, e12
      
    ],
  ],
  "01100001": [
    [
      [ edges[6], edges[7], edges[10] ], // e7, e8, e11
      [ edges[0], edges[2], edges[11] ], // e1, e3, e12
      [ edges[0], edges[9], edges[11] ], // e1, e10, e12
    ],
    [
      [ edges[0], edges[2], edges[7] ], // e1, e3, e8
      [ edges[0], edges[7], edges[9] ], // e1, e8, e10
      [ edges[2], edges[7], edges[10] ], // e3, e8, e11
      [ edges[6], edges[7], edges[11] ], // e7, e8, e12
      [ edges[7], edges[9], edges[11] ], // e8, e10, e12
    ],
  ]
}