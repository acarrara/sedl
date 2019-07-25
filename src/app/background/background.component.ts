import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Land} from '../models/Land';

const types = Land.LANDS.map(land => land.type);

@Component({
  selector: 'se-background',
  templateUrl: 'background.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {

  public backSeeds = [...types, ...types, ...types, ...types, ...types];
}
