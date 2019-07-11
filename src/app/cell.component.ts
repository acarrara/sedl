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
  public sustenance: boolean;
  @Input()
  public id: string;
  @Input()
  public impregnable: boolean;
  @Input()
  public i: number;

}
