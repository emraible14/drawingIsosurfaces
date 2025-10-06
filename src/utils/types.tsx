
export interface VoxelPoint {
  x: number,
  y: number,
  z: number,
}

export interface VoxelEdge {
  v1: VoxelPoint,
  v2: VoxelPoint,
}

export interface VoxelFace {
  v1: VoxelPoint,
  v2: VoxelPoint,
  v3: VoxelPoint,
  v4: VoxelPoint,
  e1: VoxelEdge,
  e2: VoxelEdge,
  e3: VoxelEdge,
  e4: VoxelEdge,
}

export interface IsoTriangle {
  p1: VoxelPoint,
  p2: VoxelPoint,
  p3: VoxelPoint,
}

export interface LookupTriangle {
  e1: VoxelEdge,
  e2: VoxelEdge,
  e3: VoxelEdge,
}