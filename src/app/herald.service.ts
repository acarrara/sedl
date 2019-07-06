import {Injectable} from '@angular/core';
import {Game} from './models/Game';
import {GameService} from './game.service';
import {Log} from './models/Log';

@Injectable()
export class HeraldService {

  private game: Game;

  constructor(private gameService: GameService) {
    this.gameService.game$.subscribe(game => this.game = game);
    this.gameService.actions$.subscribe(log => this.record(log));
  }

  public record(log: Log): void {
    if (log) {
      this.game.record(log.serialize());
    }
  }
}
