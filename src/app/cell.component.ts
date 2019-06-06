import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-cell',
  templateUrl: 'cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {

  @Input()
  public seed: string;

}
