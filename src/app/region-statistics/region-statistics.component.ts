import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';
import {Land} from '../models/Land';

@Component({
  selector: 'se-region-statistics',
  templateUrl: 'region-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionStatisticsComponent {

  @Input()
  public region: Region;
  @Input()
  public lord: Lord;

  private labels = Land.LANDS.reduce((labels, land) => {
    labels[land.type] = land.name;
    return labels;
  }, {});

  public getLabel() {
    return this.labels[this.region.type];
  }

  public getAction() {
    return this.lord.activeActionOn(this.region);
  }

  public canRun() {
    return this.getAction().can(this.lord, this.region);
  }
}
