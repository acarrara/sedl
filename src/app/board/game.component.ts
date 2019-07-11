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

  constructor(public gameService: GameService) {
  }

  public action(region: Region) {
    this.gameService.action(region);
  }

  public actionEnter(region: Region, $event: MouseEvent) {
    this.currentRegion = region;
    if ($event.buttons === 1) {
      this.action(region);
    }
  }

  public dimension() {
    return Math.sqrt(this.game.board.regions.length);
  }

  public toggleMenu() {
    this.collapsed = !this.collapsed;
  }

  public trackBy(index, element) {
    return index;
  }
}
