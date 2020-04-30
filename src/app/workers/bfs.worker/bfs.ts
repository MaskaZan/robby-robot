import {
  BFSResult,
  Command,
  Commands,
  Direction,
  Field,
  FieldsMatrix,
  Path,
  Position
} from './types';

const DIRECTIONS = [
  Direction.Right,
  Direction.Down,
  Direction.Left,
  Direction.Up
];

interface MapStepNode {
  index: number;
  from: Direction;
}

const generateStepsMatrix = (map: FieldsMatrix): MapStepNode[][] =>
  map.map(
    (row) => row.map(
      (field: Field) => {
        switch (field) {
          case Field.Blocked:
            return { index: -1, from: Direction.Unknown };
          case Field.Start:
            return { index: 1, from: Direction.Unknown };
          default:
            return { index: 0, from: Direction.Unknown };
        }
      }
    )
  );

type PositionFunction = (position: Position) => Position;

type StepFunction = (map: MapStepNode[][], cursor: Position) =>
  [MapStepNode, Position];

const stepTo: { [key: string]: StepFunction } = {
  Right: (map, { x, y }) => (x += 1, [map[y][x], { x, y }]),
  Down: (map, { x, y }) => (y += 1, [map[y][x], { x, y }]),
  Left: (map, { x, y }) => (x -= 1, [map[y][x], { x, y }]),
  Up: (map, { x, y }) => (y -= 1, [map[y][x], { x, y }])
};

const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.Up:
      return Direction.Down;
    case Direction.Down:
      return Direction.Up;
    case Direction.Left:
      return Direction.Right;
    case Direction.Right:
      return Direction.Left;
    case Direction.Unknown:
      return Direction.Unknown;
  }
};

export default function bfs(
  matrix: FieldsMatrix,
  start: Position,
  target: Position
): BFSResult {
  const path: Path = [];

  const stepsMatrix = generateStepsMatrix(matrix);
  const queue: Position[] = [start];

  let cursor: Position;
  let passed = false;

  while (queue.length !== 0) {
    cursor = queue.shift();

    if (cursor.x === target.x && cursor.y === target.y) {
      passed = true;
      break;
    }

    DIRECTIONS.forEach((direction) => {
      const [nextCursor, nextPosition] = stepTo[Direction[direction]](stepsMatrix, cursor);

      if (nextCursor.index === 0) {
        nextCursor.index = stepsMatrix[cursor.y][cursor.x].index + 1;
        nextCursor.from = getOppositeDirection(direction);

        queue.push(nextPosition);
      }
    });
  }

  let prevDirection: Direction = Direction.Unknown;

  while (true) {
    path.unshift({
      ...cursor,
      from: stepsMatrix[cursor.y][cursor.x].from,
      to: getOppositeDirection(prevDirection)
    });

    if (cursor.x === start.x && cursor.y === start.y) {
      break;
    }

    prevDirection = stepsMatrix[cursor.y][cursor.x].from;

    switch (prevDirection) {
      case Direction.Right: cursor.x += 1; break;
      case Direction.Down: cursor.y += 1; break;
      case Direction.Left: cursor.x -= 1; break;
      case Direction.Up: cursor.y -= 1; break;
    }
  }

  const commands: Commands = path
    .reduce((result, step) => {

      if (step.to === Direction.Unknown) {
        return result;
      }

      if (
        (step.from === Direction.Left && step.to === Direction.Up) ||
        (step.from === Direction.Up && step.to === Direction.Right) ||
        (step.from === Direction.Right && step.to === Direction.Down) ||
        (step.from === Direction.Down && step.to === Direction.Left)
      ) {
        result.push(Command.Left);
      }

      if (
        (step.from === Direction.Up && step.to === Direction.Left) ||
        (step.from === Direction.Right && step.to === Direction.Up) ||
        (step.from === Direction.Down && step.to === Direction.Right) ||
        (step.from === Direction.Left && step.to === Direction.Down)
      ) {
        result.push(Command.Right);
      }

      result.push(Command.Forward);

      return result;
    }, [] as Commands);

    if (path[0].to === Direction.Right) {
      commands.unshift(Command.Right);
    } else if (path[0].to === Direction.Left) {
      commands.unshift(Command.Left);
    } else if (path[0].to === Direction.Down) {
      commands.unshift(Command.Right, Command.Right);
    }

    return {
      passed,
      path,
      commands
    };
}
