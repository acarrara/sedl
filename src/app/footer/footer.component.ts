import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';
import {GameService} from '../game.service';

@Component({
  selector: 'se-footer',
  templateUrl: 'footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  @Input()
  public region: Region;
  @Input()
  public lord: Lord;

  constructor(public game: GameService) {
  }

  getLabel() {
    switch (this.region.type) {
      case 's':
        return 'Settlement';
      case 'w':
        return 'Water';
      case 'p':
        return 'Plain';
      case 'h':
        return 'Hill';
      case 'f':
        return 'Forest';
      default:
        return 'Unkwnown';
    }
  }

  getAction() {
    return this.lord.activeActionOn(this.region);
  }

  canRun() {
    return this.lord.activeActionOn(this.region).can(this.lord, this.lord.board, this.region);
  }
}
