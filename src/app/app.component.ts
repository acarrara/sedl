import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {game3} from './data/game3';

@Component({
  selector: 'se-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(public game: GameService) {
  }

  ngOnInit(): void {
    this.game.start(game3());
  }
}

