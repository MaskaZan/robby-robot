import { BFSResult, Command } from '../workers/bfs.worker';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bfsPoints'
})
export class BfsPointsPipe implements PipeTransform {

  transform(value: BFSResult | null, power: number): string {
    if (value === null) {
      return '';
    }

    const { path } = value;

    if (path.length < 2) {
      return '';
    }

    const pathLength = value
      .commands
      .slice(0, power)
      .filter(command => command === Command.Forward)
      .length;

    return path
      .map(({ x, y }) => `${x * 10 - 5} ${y * 10 - 5}`)
      .slice(0, pathLength + 1)
      .join(',');
  }

}
