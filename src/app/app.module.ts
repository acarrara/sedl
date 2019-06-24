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
import {PinchAndZoomDirective} from './pinch-and-zoom.directive';
import {HelpComponent} from './help/help.component';
import {AboutComponent} from './about/about.component';
import {NewComponent} from './new/new.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {GameComponent} from './board/game.component';
import {WorldPreviewComponent} from './world/world-preview.component';
import {WinComponent} from './win/win.component';
import {ModalComponent} from './modal/modal.component';
import {RegionStatisticsComponent} from './region-statistics/region-statistics.component';
import {SupportComponent} from '../support/support.component';
import {ActionsComponent} from './actions/actions.component';

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
    GameComponent,
    CellComponent,
    WorldPreviewComponent,
    WinComponent,
    LordStatisticsComponent,
    LordStatisticsElementComponent,
    RegionDirective,
    GridDirective,
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    HelpComponent,
    AboutComponent,
    NewComponent,
    ModalComponent,
    RegionStatisticsComponent,
    SupportComponent,
    ActionsComponent,
    PinchAndZoomDirective
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [GameService, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
