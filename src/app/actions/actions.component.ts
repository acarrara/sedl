import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GameService} from '../game.service';
import {Lord} from '../models/Lord';

@Component({
  selector: 'se-actions',
  templateUrl: 'actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent {

  @Input()
  public lord: Lord;

  constructor(public game: GameService) {
  }

}
