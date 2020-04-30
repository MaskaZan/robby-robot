import { BFSResult, FieldsMap, FieldsMatrix, ID, Position } from './types';
import { Injectable, Type } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { SlicePipe } from '@angular/common';
import { parse } from './parse';

export * from './types';
export * from './bfs';

export class BFSWorker {
  public stream$: Observable<BFSResult>;

  private worker: Worker;
  private currId: ID = 0;
  private lastId: ID = 0;
  private tmpBuffer: [FieldsMatrix, Position, Position] = null;

  constructor() {
    this.worker = new Worker('assets/workers/main.js');
    const workerStream$ = fromEvent<MessageEvent>(this.worker, 'message');

    this.stream$ = workerStream$
      .pipe(
        filter(({ data: [id] }) => {
          return id === this.currId;
        }),
        map(({ data: [id, bfsResult] }) => bfsResult)
      );

    workerStream$.subscribe(() => {
      this.lastId = this.currId;
      if (this.tmpBuffer !== null) {
        this.currId += 1;
        this.worker.postMessage([this.currId, ...this.tmpBuffer]);
        this.tmpBuffer = null;
      }
    });
  }

  public calc(matrix: FieldsMatrix, start: Position, target: Position): void {
    if (this.currId === this.lastId) {
      this.currId += 1;
      this.worker.postMessage([this.currId, matrix, start, target]);
    } else {
      this.tmpBuffer = [matrix, start, target];
    }
  }
}

@Injectable({
  providedIn: Type
})
export class BFSService {

  constructor() {
  }

  private cache = new Map<string, BFSWorker>();

  public getBFSWorker(name: string): BFSWorker {
    if (!this.cache.has(name)) {
      this.cache.set(name, new BFSWorker());
    }

    return this.cache.get(name);
  }

  public parse(rawMap: string): FieldsMap {
    return parse(rawMap);
  }

  public matrixToString(matrix: FieldsMatrix): string {
    return matrix
      .slice(1, matrix.length - 1)
      .map(row => row
        .slice(1, row.length - 1)
        .join(''))
      .join('');
  }

}
