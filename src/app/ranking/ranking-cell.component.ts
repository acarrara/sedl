import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-ranking-cell',
  templateUrl: 'ranking-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingCellComponent {

  @Input()
  public quantity: number;
  @Input()
  public seed: string;

}
