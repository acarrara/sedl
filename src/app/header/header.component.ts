import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GameService} from '../game.service';
import {Lord} from '../models/Lord';

@Component({
  selector: 'se-header',
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input()
  lord0: Lord;
  @Input()
  lord1: Lord;

  constructor(public game: GameService) {
  }
}
