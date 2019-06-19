import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';
import {Game} from '../models/Game';
import {world1} from '../data/game1';
import {world2} from '../data/game2';
import {world3} from '../data/game3';

@Component({
  selector: 'se-new',
  templateUrl: 'new.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent {

  public game1: () => Game = game1;
  public game2: () => Game = game2;
  public game3: () => Game = game3;

  world1: string[] = world1;
  world2: string[] = world2;
  world3: string[] = world3;

  constructor(public game: GameService) {
  }

  dimension(world: string[]) {
    return Math.sqrt(world.length);
  }
}
