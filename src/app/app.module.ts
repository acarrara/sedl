import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CellComponent} from './cell.component';
import {RegionDirective} from './region.directive';
import {GridDirective} from './grid.directive';
import {LordRecapComponent} from './header/lord-recap.component';
import {LordRegionElementComponent} from './header/lord-region-element.component';
import {GameService} from './game.service';
import {CountPipe} from './header/seCount.pipe';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    LordRecapComponent,
    LordRegionElementComponent,
    RegionDirective,
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
