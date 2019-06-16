import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'se-logo',
  templateUrl: 'logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {

  constructor(public game: GameService) {
  }

}
