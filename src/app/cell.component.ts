import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-cell',
  templateUrl: 'cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {

  @Input()
  public seed: string;
  @Input()
  sustenance: boolean;
  @Input()
  color: string;
  @Input()
  impregnable: boolean;
  @Input()
  i: number;

}
