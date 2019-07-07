import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
export class NewComponent implements OnInit {

  public games: Game[];

  constructor(public game: GameService, private storage: StorageService) {
  }

  ngOnInit(): void {
    this.games = [game3(), game2(), game1(), ...this.storage.loadCreatedGames()];
  }

  description(current: Game) {
    return '(' + current.board.grid.size() + 'x' + current.board.grid.size() + ')';
  }
}
