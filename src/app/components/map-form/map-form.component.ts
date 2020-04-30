import { BFSResult, BFSService, BFSWorker, Field, FieldsMap, FieldsMatrix } from 'src/app/workers/bfs.worker';
import { Cells, UpdateCellType } from '../map/map.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { combineLatest } from 'rxjs';

const SelectTarget = {
  [Field.Blocked]: [Field.Start, Field.Walkable],
  [Field.Start]: [Field.Target, Field.Blocked],
  [Field.Target]: [Field.Walkable, Field.Start],
  [Field.Walkable]: [Field.Blocked, Field.Target],
};

@Component({
  selector: 'app-map-form',
  templateUrl: './map-form.component.html',
  styleUrls: ['./map-form.component.css']
})
export class MapFormComponent implements OnInit {
  @Input() initialState: FieldsMap = {
    start: { x: 1, y: 1 },
    target: { x: 2, y: 2 },
    matrix: [
      [Field.Blocked, Field.Blocked, Field.Blocked, Field.Blocked],
      [Field.Blocked, Field.Start, Field.Blocked, Field.Blocked],
      [Field.Blocked, Field.Walkable, Field.Target, Field.Blocked],
      [Field.Blocked, Field.Blocked, Field.Blocked, Field.Blocked]
    ]
  };

  @Output() matrixUpdate = new EventEmitter<FieldsMatrix>();
  @Output() bfsUpdate = new EventEmitter<{ passed, commands }>();

  private form: FormGroup;

  private start = { x: 1, y: 1 };
  private target = { x: 5, y: 5 };

  private bfsWorker: BFSWorker;
  private hoverBFSWorker: BFSWorker;

  private mapHover = false;

  constructor(private bfs: BFSService) {
    this.bfsWorker = bfs
      .getBFSWorker('map');

    this.hoverBFSWorker = bfs
      .getBFSWorker('hover-map');

    // this.bfsWorker.stream$
    //   .subscribe((bfsResult) => {
    //     console.log(bfsResult.commands.length <= this.form.value.power, bfsResult.commands.length, this.form.value.power);
    //     this.bfsUpdate.emit({
    //       passed:
    //         bfsResult.passed &&
    //         (bfsResult.commands.length <= this.form.value.power),
    //       commands: bfsResult.commands.slice(0, this.form.value.power)
    //     });
    //   });
  }

  private generateMap(size: number): FieldsMatrix {
    const map: Array<Array<Field>> = (new Array(size))
      .fill((new Array(size)).fill(undefined))
      .map((row, y) => row
        .map((_, x) =>
          (y !== 0 && x !== 0 && y !== size - 1 && x !== size - 1) ?
            Field.Walkable : Field.Blocked));

    map[1][1] = Field.Start;
    map[size - 2][size - 2] = Field.Target;

    return map;
  }

  ngOnInit() {
    const {
      start,
      target,
      matrix
    } = this.initialState;

    this.form = new FormGroup({
      target: new FormControl(Field.Start),
      map: new FormControl(matrix),
      size: new FormControl(matrix.length - 2),
      power: new FormControl(25)
    });

    this.form.get('size').valueChanges
      .subscribe((value) => {
        this.form.get('map')
          .setValue(this.generateMap(value + 2));

        this.start = { x: 1, y: 1 };
        this.target = { x: value, y: value };

        this.bfsWorker.calc(
          this.form.value.map,
          this.start,
          this.target
        );
      });

    this.form.get('map').valueChanges
      .subscribe(value => this.matrixUpdate.emit(value));

    this.start = start;
    this.target = target;

    this.bfsWorker.calc(matrix, start, target);

    combineLatest(
      this.bfsWorker.stream$,
      this.form.get('power').valueChanges
    ).subscribe(([bfsResult, power]) => {
      this.bfsUpdate.emit({
        passed:
          bfsResult.passed &&
          (bfsResult.commands.length <= power),
        commands: bfsResult.commands.slice(0, power)
      });
    });
  }

  private getMapViewBox(): string {
    const length = this.form.value.map.length - 2;

    return `0 0 ${length * 10} ${length * 10}`;
  }

  private setCellHook = (
    cells: Cells,
    value: Field,
    x: number,
    y: number,
    type: UpdateCellType
  ): Cells => {
    let {
      start,
      target
    } = this;

    if ([Field.Start, Field.Target].includes(value)) {
      if (value === Field.Start) {
        start = { x, y };
      } else if (value === Field.Target) {
        target = { x, y };
      }

      cells = cells
        .map((row, j) => row
          .map((symbol, i) =>
            symbol === value &&
            !(i === x && j === y) ?
              Field.Walkable : symbol));
    }

    if (type === UpdateCellType.Set) {
      this.start = start;
      this.target = target;
      this.bfsWorker.calc(cells as FieldsMatrix, this.start, this.target);
    } else {
      this.hoverBFSWorker.calc(cells as FieldsMatrix, start, target);
    }

    return cells;
  }

  private selectTarget(event) {
    const selectIndex = event.wheelDelta < 0 ? 0 : 1;

    this.form.get('target').setValue(
      SelectTarget[this.form.value.target][selectIndex]
    );
  }

}
