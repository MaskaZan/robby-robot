import { FieldsMatrix, ID, Position } from './types';

import bfs from './bfs';

self.addEventListener('message', ({ data, origin }) => {
  const [id, matrix, start, target]: [ID, FieldsMatrix, Position, Position] = data;

  (self as any).postMessage([id, bfs(matrix, start, target)]);
});

