import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'se-header',
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(public game: GameService) {
  }
}
