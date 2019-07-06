import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Lord} from '../models/Lord';

@Component({
  selector: 'se-ranking-table',
  templateUrl: 'ranking-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingTableComponent {

  @Input()
  public lords: Lord[];

  @Input()
  public showIndex = false;

}
