import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'se-ranking',
  templateUrl: 'ranking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingComponent {

  public collapsed = true;

  constructor(public gameService: GameService) {
  }

  public toggleRanking() {
    this.collapsed = !this.collapsed;
  }

}
