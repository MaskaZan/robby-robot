import {
  ExcessStartError,
  ExcessTargetError,
  Field,
  FieldsMap,
  FieldsMatrix,
  InvalidMatrixFieldsError,
  InvalidMatrixSizeError,
  Position
} from './types';

const calcSize = (rawMap: FieldsMatrix | string): number => {
  const size = typeof rawMap === 'string' ?
    Math.sqrt(rawMap.length) :
    rawMap.length - 2;

  if (!Number.isInteger(size) || size < 2) {
    throw new InvalidMatrixSizeError();
  }

  return size;
};

const StartAndTargetPromNames = {
  [Field.Start]: 'start',
  [Field.Target]: 'target'
};

interface StartAndTarget {
  start: Position;
  target: Position;
}

const findStartAndTarget = (fieldsMatrix: FieldsMatrix): StartAndTarget => {
  let start: Position;
  let target: Position;

  fieldsMatrix.forEach(
    (row, y) => row.forEach((field, x) => {
      switch (field) {
        case Field.Start:
          if (start === undefined) {
            start = { x, y };
          } else {
            throw new ExcessStartError(x, y);
          }
          break;

        case Field.Target:
          if (target === undefined) {
            target = { x, y };
          } else {
            throw new ExcessTargetError(x, y);
          }
          break;
      }
    })
  );

  if (start === undefined) {
    throw new ExcessStartError(NaN, NaN);
  }

  if (target === undefined) {
    throw new ExcessTargetError(NaN, NaN);
  }

  return { start, target };
};

export const parse = (rawMap: string): FieldsMap => {
  const size = calcSize(rawMap);

  const fields: FieldsMatrix = rawMap
    .split('')
    .map(symbol => {
      switch (symbol) {
        case Field.Walkable:
        case Field.Blocked:
        case Field.Start:
        case Field.Target:
          return symbol;

        default:
          throw new InvalidMatrixFieldsError();
      }
    })
    .reduce(
      (matrix, field, index) => {
        matrix[Math.floor(index / size)][index % size] = field;
        return matrix;
      },
      (new Array(size))
        .fill(undefined)
        .map(() => new Array(size)) as FieldsMatrix
    )
    // Vertical walls
    .map(row => [Field.Blocked, ...row, Field.Blocked]);

  // Horizontal walls
  fields.unshift((new Array<Field>(size + 2)).fill(Field.Blocked));
  fields.push((new Array<Field>(size + 2)).fill(Field.Blocked));

  const { start, target } = findStartAndTarget(fields);

  return {
    matrix: fields,
    start,
    target
  };
};
