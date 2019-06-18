import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {Region} from './models/Region';
import {game3} from './data/game3';

@Component({
  selector: 'se-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public availableAction = 'Unreachable';
  currentRegion: Region;
  public backSeeds = [
    'm', 'f', 'w', 'h', 'p', 'm', 'f', 'w', 'h',
    'p', 'm', 'f', 'w', 'h', 'p', 'm', 'f', 'w',
    'h', 'p', 'm', 'f', 'w', 'h', 'p', 'm', 'f',
    'w', 'h', 'p'];

  constructor(public game: GameService) {
  }

  action(region: Region) {
    this.game.action(region);
    this.updateAvailableAction(region);
  }

  actionEnter(region: Region, $event: MouseEvent) {
    this.currentRegion = region;
    if ($event.buttons === 1) {
      this.action(region);
    }
  }

  ngOnInit(): void {
    this.game.start(game3);
  }

  private updateAvailableAction(region: Region) {
    this.availableAction = this.game.currentLord().activeActionOn(region).name();
  }
}

