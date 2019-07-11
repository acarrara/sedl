import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output()
  public selection: EventEmitter<any> = new EventEmitter(false);

  constructor(public game: GameService) {
  }

  public clicked() {
    this.selection.emit(null);
  }

}
