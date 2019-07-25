import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from '../game.service';
import {Land} from '../models/Land';
import {Economy} from '../models/Economy';

@Component({
  selector: 'se-help',
  templateUrl: 'help.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent {

  public lands = Land.LANDS;

  constructor(public game: GameService) {
  }

  public conquerCost(land: Land, sustenance: boolean) {
    return Economy.conquerCost(land.type, sustenance);
  }

  public sustenanceCost(land: Land) {
    return Economy.sustenanceCost(land.type);
  }
}
