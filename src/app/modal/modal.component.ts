import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'se-modal',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

  @Input()
  public size = 'm';

  @Input()
  public name: string;

  constructor(public game: GameService) {
  }

}
