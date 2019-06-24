import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'se-controls',
  templateUrl: 'controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent {
  @Input()
  side: string;

  constructor(public gameService: GameService) {
  }

}
