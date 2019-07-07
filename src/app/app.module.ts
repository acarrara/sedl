import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CellComponent} from './cell.component';
import {RegionDirective} from './region.directive';
import {GridDirective} from './grid.directive';
import {GameService} from './game.service';
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
import {SupportComponent} from './support/support.component';
import {ActionsComponent} from './actions/actions.component';
import {ControlsComponent} from './controls/controls.component';
import {LordColorsDirective} from './lord-colors.directive';
import {RankPipe} from './rank.pipe';
import {HeraldService} from './herald.service';
import {CreateComponent} from './create/create.component';
import {ReplayComponent} from './replay/replay.component';
import {RankingComponent} from './ranking/ranking.component';
import {RankingTableComponent} from './ranking/ranking-table.component';
import {StorageService} from './storage/storage.service';

@Injectable()
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
    RegionDirective,
    GridDirective,
    LogoComponent,
    HelpComponent,
    AboutComponent,
    NewComponent,
    ModalComponent,
    RegionStatisticsComponent,
    SupportComponent,
    ActionsComponent,
    ControlsComponent,
    CreateComponent,
    ReplayComponent,
    RankingComponent,
    RankingTableComponent,
    PinchAndZoomDirective,
    LordColorsDirective,
    RankPipe
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    GameService,
    StorageService,
    HeraldService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
