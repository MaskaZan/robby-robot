import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BFSService } from './workers/bfs.worker';
import { BfsPointsPipe } from './pipes/bfs-points.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlatPipe } from './pipes/flat.pipe';
import { MapComponent } from './components/map/map.component';
import { MapFormComponent } from './components/map-form/map-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectorComponent } from './selector/selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MapFormComponent,
    MapComponent,
    FlatPipe,
    SelectorComponent,
    BfsPointsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([])
  ],
  providers: [BFSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
