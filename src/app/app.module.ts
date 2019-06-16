import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CellComponent} from './cell.component';
import {RegionDirective} from './region.directive';
import {GridDirective} from './grid.directive';
import {LordStatisticsComponent} from './header/lord-statistics.component';
import {LordStatisticsElementComponent} from './header/lord-statistics-element.component';
import {GameService} from './game.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LogoComponent} from './logo/logo.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: Hammer.DIRECTION_ALL}, // override default settings
    pan: {direction: Hammer.DIRECTION_ALL},
    press: {time: 1001},
    pinch: {enable: true, direction: Hammer.DIRECTION_ALL}
  } as any;
}

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    LordStatisticsComponent,
    LordStatisticsElementComponent,
    RegionDirective,
    GridDirective,
    HeaderComponent,
    LogoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
