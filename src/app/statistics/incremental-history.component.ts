import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GameStatistics} from '../models/GameStatistics';

@Component({
  selector: 'se-incremental-history',
  templateUrl: 'incremental-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncrementalHistoryComponent implements OnInit {
  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  stats: GameStatistics;

  private xUnit: number;
  private yUnit: number;

  ngOnInit(): void {
    this.xUnit = this.width / this.stats.xSteps;
    this.yUnit = this.height / this.stats.ySteps;
  }

  path(serieIds: string[]) {
    const series: number[][] = serieIds.map(id => this.stats[id]);
    return series[0].reduce(
      (previous, current, i) => previous + ' L ' + (this.xUnit * (i + 1)) + ' ' + this.current(series, i),
      'M0 0 V ' + (this.yUnit * 5 * serieIds.length)
    ) + ' V -' + this.current(series, series[0].length - 1) + ' H 0';
  }

  private current(series: number[][], index: number) {
    return series.reduce((previousValue, currentValue) => previousValue + currentValue[index], 0) * this.yUnit;
  }
}
