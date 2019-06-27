import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GameService} from '../game.service';
import {Region} from '../models/Region';
import {Game} from '../models/Game';

@Component({
  selector: 'se-game',
  templateUrl: 'game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {

  @Input()
  public game: Game;

  public currentRegion: Region;
  public backSeeds = [
    'm', 'f', 'w', 'h', 'p', 'm', 'f', 'w', 'h',
    'p', 'm', 'f', 'w', 'h', 'p', 'm', 'f', 'w',
    'h', 'p', 'm', 'f', 'w', 'h', 'p', 'm', 'f',
    'w', 'h', 'p'];
  public collapsed = true;
  public rankingCollapsed = true;

  constructor(public gameService: GameService) {
  }

  action(region: Region) {
    this.gameService.action(region);
  }

  actionEnter(region: Region, $event: MouseEvent) {
    this.currentRegion = region;
    if ($event.buttons === 1) {
      this.action(region);
    }
  }

  dimension() {
    return Math.sqrt(this.game.board.regions.length);
  }

  toggleMenu() {
    this.collapsed = !this.collapsed;
  }

  toggleRanking() {
    this.rankingCollapsed = !this.rankingCollapsed;
  }
}
