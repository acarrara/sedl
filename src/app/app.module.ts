import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CellComponent} from './cell.component';
import {DominionDirective} from './dominion.directive';
import {GridDirective} from './grid.directive';
import {ConquerorViewComponent} from './header/conqueror-recap.component';
import {ConquerorDominionElementComponent} from './header/conqueror-dominion-element.component';
import {GameService} from './game.service';
import {CountPipe} from './header/seCount.pipe';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ConquerorViewComponent,
    ConquerorDominionElementComponent,
    DominionDirective,
    GridDirective,
    CountPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
