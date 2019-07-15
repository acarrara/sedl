import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'se-modal',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

  @Input()
  public size = 'l';

  @Input()
  public name: string;

  @Input()
  public overflow = true;

  constructor(public gameService: GameService) {
  }

}
