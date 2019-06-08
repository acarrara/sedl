import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Lord} from '../models/Lord';
import {GameService} from '../game.service';

@Component({
  selector: 'se-lord-recap',
  templateUrl: 'lord-recap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LordRecapComponent {

  @Input()
  lord: Lord;

  constructor(public game: GameService) {
  }

}
