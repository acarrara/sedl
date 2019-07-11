import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Statistics} from '../models/Statistics';

@Component({
  selector: 'se-incremental-history',
  templateUrl: 'incremental-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncrementalHistoryComponent implements OnInit {
  @Input()
  public width: number;
  @Input()
  public height: number;
  @Input()
  public stats: Statistics;
  @Input()
  public initialY: number;

  public seriesIds: string[];

  private xUnit: number;
  private yUnit: number;

  public ngOnInit(): void {
    this.xUnit = this.width / this.stats.xSteps;
    this.yUnit = this.height / this.stats.ySteps;
    this.seriesIds = Object.keys(this.stats.series);
  }

  public path(index: number) {
    const series: number[][] = this.getSerieIds(index).map(id => this.stats.series[id]);
    this.initialY = 5;
    return series[0].reduce(
      (previous, current, i) => previous + ' L ' + (this.xUnit * (i + 1)) + ' ' + this.current(series, i),
      'M0 0 V ' + (this.yUnit * this.initialY * this.getSerieIds(index).length)
    ) + ' V -' + this.current(series, series[0].length - 1) + ' H 0';
  }

  private current(series: number[][], index: number) {
    return series.reduce((previousValue, currentValue) => previousValue + currentValue[index], 0) * this.yUnit;
  }

  private getSerieIds(index: number): string[] {
    return this.seriesIds.slice(0, this.seriesIds.length - index);
  }
}
