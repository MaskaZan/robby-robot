import { Pipe, PipeTransform } from '@angular/core';

interface Array<T> {
  flat(depth?: number): T;
}

@Pipe({
  name: 'flat'
})
export class FlatPipe implements PipeTransform {

  transform(value: Array<any>, depth = 1): any {
    return value.flat(depth);
  }

}
