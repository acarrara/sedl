import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-controls',
  templateUrl: 'controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent {

  @Input()
  public side: string;
}
