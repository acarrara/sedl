import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';
import {Game} from '../models/Game';
import {world1, game1} from '../data/game1';
import {world2, game2} from '../data/game2';
import {world3, game3} from '../data/game3';

@Component({
  selector: 'se-new',
  templateUrl: 'new.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent {

  public gameLarge: () => Game = game1;
  public gameMedium: () => Game = game2;
  public gameSmall: () => Game = game3;

  world1: string[] = world1;
  world2: string[] = world2;
  world3: string[] = world3;

  constructor(public game: GameService) {
  }

  dimension(world: string[]) {
    return Math.sqrt(world.length);
  }
}
