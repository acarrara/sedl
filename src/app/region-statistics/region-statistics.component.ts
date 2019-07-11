import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';

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

  public getLabel() {
    switch (this.region.type) {
      case 's':
        return 'settlement';
      case 'w':
        return 'water';
      case 'p':
        return 'plain';
      case 'h':
        return 'hill';
      case 'f':
        return 'forest';
      case 'm':
        return 'mountain';
      default:
        return 'Unknown';
    }
  }

  public getAction() {
    return this.lord.activeActionOn(this.region);
  }

  public canRun() {
    return this.getAction().can(this.lord, this.region);
  }
}
