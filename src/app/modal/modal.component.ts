import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

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

}
