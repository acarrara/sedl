import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Conqueror} from '../models/Conqueror';
import {GameService} from '../game.service';

@Component({
  selector: 'se-conqueror-recap',
  templateUrl: 'conqueror-recap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConquerorViewComponent {

  @Input()
  conqueror: Conqueror;

  constructor(public game: GameService) {
  }

}
