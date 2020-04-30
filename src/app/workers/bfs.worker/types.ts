export type ID = number;

export enum Field {
  Walkable = '.',
  Blocked = '#',
  Start = 'S',
  Target = 'T'
}

export enum Command {
  Forward = 'f',
  Left = 'l',
  Right = 'r'
}

export enum Direction {
  Unknown,
  Up,
  Right,
  Down,
  Left
}

export interface Position {
  x: number;
  y: number;
}

export interface Step {
  x: number;
  y: number;
  from: Direction;
  to: Direction;
}

export type FieldsMatrix = Array<Array<Field>>;

export interface FieldsMap {
  matrix: FieldsMatrix;
  start: Position;
  target: Position;
}

export type Path = Array<Step>;
export type Commands = Array<Command>;

export interface BFSResult {
  passed: boolean;
  path: Path;
  commands: Commands;
}

export class InvalidMatrixSizeError extends Error { constructor() { super(); } }
export class InvalidMatrixFieldsError extends Error { }
export class InvalidFieldSetError extends Error { }

export class ExcessStartError extends Error {
  constructor(public x: number, public y: number) {
    super();
  }
}

export class ExcessTargetError extends Error {
  constructor(public x: number, public y: number) {
    super();
  }
}
