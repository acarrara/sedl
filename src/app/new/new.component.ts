import {ApplicationRef, ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';
import {game1} from '../data/game1';
import {game2} from '../data/game2';
import {game3} from '../data/game3';
import {Game} from '../models/Game';

@Component({
  selector: 'se-new',
  templateUrl: 'new.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent {

  public game1: Game = game1;
  public game2: Game = game2;
  public game3: Game = game3;

  constructor(public game: GameService, private app: ApplicationRef) {
  }
}
