import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {game3} from './data/game3';
import {HeraldService} from './herald.service';

@Component({
  selector: 'se-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(public game: GameService, public herald: HeraldService) {
  }

  ngOnInit(): void {
    this.game.start();
  }
}

