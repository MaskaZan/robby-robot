import { BFSService, Commands, FieldsMap, FieldsMatrix } from './workers/bfs.worker';
import { Component, OnInit } from '@angular/core';
import { skip, timeout } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';

const defaultRawMap =
  'S..' +
  '...' +
  '..T';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private initialState: FieldsMap;
  private passed: boolean;
  private commands: string;

  constructor(private bfsService: BFSService, private route: ActivatedRoute) {
    const locationSubscription = route
      .queryParams
      .pipe(
        skip(1),
        timeout(1000)
      )
      .subscribe(
        ({ map }: { map: string }) => {
          try {
            const fieldsMap: FieldsMap = bfsService.parse(map);
            this.initialState = fieldsMap;
          } catch {
            location.href = `/?map=${defaultRawMap}`;
          }
          locationSubscription.unsubscribe();
        },
        () => location.href = `/?map=${defaultRawMap}`
      );
  }

  private onFieldsMatrixUpdate(matrix: FieldsMatrix): void {
    history.replaceState({}, document.title, `/?map=${
      this.bfsService.matrixToString(matrix)
    }`);
  }

  private debug(data: { passed: boolean, commands: Commands}) {
    this.passed = !!data.passed;
    this.commands = (data.commands || []).join(' ');
  }

  ngOnInit(): void { }
}
