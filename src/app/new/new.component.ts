import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';
import {Game} from '../models/Game';
import {StorageService} from '../storage/storage.service';
import {game3} from '../data/game3';
import {game2} from '../data/game2';
import {game1} from '../data/game1';

@Component({
  selector: 'se-new',
  templateUrl: 'new.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent {

  public defaults: Game[] = [game3(), game2(), game1()];

  constructor(public game: GameService, public storage: StorageService) {
  }

  description(current: Game) {
    return '(' + current.board.grid.size() + 'x' + current.board.grid.size() + ')';
  }

  deleteGame(current: Game) {
    this.storage.delete(current);
  }
}
