import { Component, EventEmitter, HostListener, Input, Output, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import memoize from 'memoizee/weak';

export type Cells = string[][];

export enum UpdateCellType {
  Set,
  Hover
}

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MapComponent),
  multi: true
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [VALUE_ACCESSOR],
  animations: [
    trigger('vailStatus', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('.1s')
      ]),
      transition('* => void', [
        style({
          opacity: 0.5
        }),
        animate('.1s', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class MapComponent implements ControlValueAccessor {

  @Input() target: string;
  @Input() disabledCells: string[] = [];

  @Output() hover: EventEmitter<Cells> = new EventEmitter();

  private cells: Cells = [];

  private vailIndex = -1;

  private updateCells = memoize((cells: Cells, x: number, y: number, value: string): Cells => {
    cells = [...this.cells];
    const row = [...cells[y]];

    cells.splice(y, 1, row);
    row.splice(x, 1, value);

    return cells;
  });

  @Input() setCellHook = (
    cells: Cells,
    value: string,
    x: number,
    y: number,
    type: UpdateCellType
  ): Cells => cells

  private trackByIndex = (index: number) => index;

  private onChange = (value: any) => {};

  private getXY(index: number): [number, number] {
    const y = Math.floor(index / this.cells.length);
    const x = index % this.cells.length;

    return [x, y];
  }

  private canNotSetCell(x: number, y: number): boolean {
    return this.cells[y][x] === this.target ||
      this.disabledCells.includes(this.cells[y][x]) ||
      x === 0 || x === this.cells.length - 1 ||
      y === 0 || y === this.cells.length - 1;
  }

  private setCell(index: number) {
    const [x, y] = this.getXY(index);

    if (this.canNotSetCell(x, y)) {
      return;
    }

    this.cells = this.updateCells(this.cells, x, y, this.target);
    this.cells = this.setCellHook(this.cells, this.target, x, y, UpdateCellType.Set);
    this.onChange(this.cells);
  }

  private setVailIndex(index: number, value: string): void {
    if (index === -1) {
      this.vailIndex = -1;
      return;
    }

    const [x, y] = this.getXY(index);

    if (this.canNotSetCell(x, y)) {
      return;
    }

    this.vailIndex = index;

    const cells = this.updateCells(this.cells, x, y, this.target);
    this.hover.emit(
      this.setCellHook(cells, this.target, x, y, UpdateCellType.Hover)
    );

  }

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: Cells) {
    this.cells = value;
  }

  registerOnTouched() { }


}
