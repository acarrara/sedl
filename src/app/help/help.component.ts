import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'se-help',
  templateUrl: 'help.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent {

  constructor(public game: GameService) {
  }
}
